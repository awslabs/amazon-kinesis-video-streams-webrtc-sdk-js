/**
 * This file demonstrates the process of starting WebRTC streaming using a KVS Signaling Channel.
 */
const masterDefaults = {
    kinesisVideoClient: null,
    signalingClient: null,
    storageClient: null,
    channelARN: null,
    peerConnectionByClientId: {},
    dataChannelByClientId: {},
    localStream: null,
    remoteStreams: [],
    peerConnectionStatsInterval: null,
    runId: 0,
    sdpOfferReceived: false,
    websocketOpened: false,
    connectionFailures: [], // Dates of when PeerConnection transitions to failed state.
    currentJoinStorageSessionRetries: 0,
};

let master = {};

/**
 * Base milliseconds between retries of joinStorageSession API calls.
 * @constant
 * @type {number}
 * @default
 */
const retryIntervalForJoinStorageSession = 6000;

/**
 * Maximum number of times we will attempt to establish Peer connection (perform
 * ICE connectivity checks) with the storage session within a ten-minute window
 * before exiting the application. This means, we have received this many SDP
 * offers within a 10-minute window, and, for all of them, the peer connection failed
 * to be established.
 * @constant
 * @type {number}
 * @default
 */
const maxConnectionFailuresWithinTenMinutesForRetries = 5;

const millisecondsInTenMinutes = 600_000;

async function startMaster(localView, remoteView, formValues, onStatsReport, onRemoteDataMessage) {
    master = { ...masterDefaults };

    try {
        master.localView = localView;
        master.remoteView = remoteView;

        // Determine the media ingestion mode
        let ingestionMode = ChannelHelper.IngestionMode.OFF;
        if (formValues.ingestMedia || formValues.showJSSButton) {
            ingestionMode = ChannelHelper.IngestionMode.DETERMINE_THROUGH_DESCRIBE;
        }

        master.channelHelper = new ChannelHelper(
            formValues.channelName,
            {
                region: formValues.region,
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
            },
            formValues.endpoint,
            KVSWebRTC.Role.MASTER,
            ingestionMode,
            '[MASTER]',
        );

        await master.channelHelper.init();

        if (master.channelHelper.isIngestionEnabled()) {
            if (!formValues.sendAudio || !formValues.sendVideo) {
                console.error('[MASTER] Both Send Video and Send Audio checkboxes need to be checked to ingest and store media.');
                return;
            }

            $('#master .remote').addClass('d-none');
            if (formValues.openDataChannel) {
                console.warn('[MASTER] DataChannel is not enabled for WebRTC ingestion. Overriding value to false.');
                formValues.openDataChannel = false;
                $('.datachannel').addClass('d-none');
            }

            master.channelHelper.getWebRTCStorageClient().config.maxRetries = 0;
            master.channelHelper.getWebRTCStorageClient().config.httpOptions.timeout = retryIntervalForJoinStorageSession;
        } else {
            console.log('[MASTER] Not using media ingestion feature.');
        }

        const iceServers = [];

        // Add the STUN server unless it is disabled
        if (!formValues.natTraversalDisabled && !formValues.forceTURN && (formValues.sendSrflxCandidates || formValues.sendPrflxCandidates)) {
            iceServers.push({ urls: `stun:stun.kinesisvideo.${formValues.region}.amazonaws.com:443` });
        }

        // Add the TURN servers unless it is disabled
        if (!formValues.natTraversalDisabled && !formValues.forceSTUN && formValues.sendRelayCandidates) {
            iceServers.push(...(await master.channelHelper.fetchTurnServers()));
        }
        console.log('[MASTER] ICE servers:', iceServers);

        const configuration = {
            iceServers,
            iceTransportPolicy: formValues.forceTURN ? 'relay' : 'all',
        };

        const resolution = formValues.widescreen
            ? {
                width: {ideal: 1280},
                height: {ideal: 720},
            }
            : {width: {ideal: 640}, height: {ideal: 480}};
        const constraints = {
            video: formValues.sendVideo ? resolution : false,
            audio: formValues.sendAudio,
        };

        // Get a stream from the webcam and display it in the local view.
        // If no video/audio needed, no need to request for the sources.
        // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.
        if (formValues.sendVideo || formValues.sendAudio) {
            try {
                master.localStream = await navigator.mediaDevices.getUserMedia(constraints);
                localView.srcObject = master.localStream;
            } catch (e) {
                console.error(`[MASTER] Could not find ${Object.keys(constraints).filter(k => constraints[k])} input device.`, e);
                return;
            }
        } else {
            // Hide the video element if nothing is to be sent.
            // $('#master .local-view').addClass('d-none');
        }

        registerMasterSignalingClientCallbacks(master.channelHelper.getSignalingClient(), formValues, configuration, onStatsReport, onRemoteDataMessage);
        console.log('[MASTER] Starting master connection');
        master.channelHelper.getSignalingClient().open();
    } catch (e) {
        console.error('[MASTER] Encountered error starting:', e);
        onStop();
    }
}

registerMasterSignalingClientCallbacks = (signalingClient, formValues, configuration, onStatsReport, onRemoteDataMessage) => {
    signalingClient.on('open', async () => {
        const masterRunId = ++master.runId;
        master.websocketOpened = true;
        const signalingConnected = new Date();
        console.debug('[MASTER] ConnectAsMaster completed at', signalingConnected);
        console.log('[MASTER] Connected to signaling service');
        console.log('[MASTER] Time to connect to signaling:', signalingConnected.getTime() - master.channelHelper.getSignalingConnectionLastStarted().getTime(), 'ms');

        if (formValues.showJSSButton) {
            $('#join-storage-session-button').removeClass('d-none');
            console.log('[MASTER] Waiting for media ingestion and storage viewer to join...');
        } else if (master.channelHelper.isIngestionEnabled()) {
            await connectToMediaServer(masterRunId, master.channelHelper.getChannelArn(), master.channelHelper.getWebRTCStorageClient());
        } else {
            console.log('[MASTER] Waiting for peers to join...');
        }
    });

    signalingClient.on('sdpOffer', async (offer, remoteClientId) => {
        printSignalingLog('[MASTER] Received SDP offer from client', remoteClientId);
        master.sdpOfferReceived = true;
        master.currentJoinStorageSessionRetries = 0;
        console.debug('SDP offer:', offer);

        // Create a new peer connection using the offer from the given client
        if (master.peerConnectionByClientId[remoteClientId] && master.peerConnectionByClientId[remoteClientId].connectionState !== 'closed') {
            master.peerConnectionByClientId[remoteClientId].close();
        }
        const peerConnection = new RTCPeerConnection(configuration);
        master.peerConnectionByClientId[remoteClientId] = peerConnection;

        if (formValues.openDataChannel) {
            peerConnection.ondatachannel = event => {
                master.dataChannelByClientId[remoteClientId] = event.channel;
                event.channel.onmessage = onRemoteDataMessage;
            };
        }

        // Poll for connection stats
        if (!master.peerConnectionStatsInterval) {
            master.peerConnectionStatsInterval = setInterval(() => peerConnection.getStats().then(onStatsReport), 10000);
        }

        peerConnection.addEventListener('connectionstatechange', async event => {
            printPeerConnectionStateInfo(event, '[MASTER]', remoteClientId);

            if (master.channelHelper.isIngestionEnabled() && event.target.connectionState === 'connected') {
                console.log(
                    '[MASTER] Successfully joined the storage session. Media is being recorded to',
                    master.channelHelper.getStreamArn() ?? 'Kinesis Video Streams',
                );
            }
        });

        // Send any ICE candidates to the other peer
        peerConnection.addEventListener('icecandidate', ({candidate}) => {
            if (candidate) {
                printSignalingLog('[MASTER] Generated ICE candidate for client', remoteClientId);
                console.debug('ICE candidate:', candidate);

                // When trickle ICE is enabled, send the ICE candidates as they are generated.
                if (formValues.useTrickleICE) {
                    if (shouldSendIceCandidate(formValues, candidate)) {
                        printSignalingLog('[MASTER] Sending ICE candidate to client', remoteClientId);
                        signalingClient.sendIceCandidate(candidate, remoteClientId);
                    } else {
                        console.log('[MASTER] Not sending ICE candidate to client', remoteClientId);
                    }
                }
            } else {
                printSignalingLog('[MASTER] All ICE candidates have been generated for client', remoteClientId);

                // When trickle ICE is disabled, send the answer now that all the ICE candidates have been generated.
                if (!formValues.useTrickleICE) {
                    printSignalingLog('[MASTER] Sending SDP answer to client', remoteClientId);
                    const correlationId = randomString();
                    console.debug('SDP answer:', peerConnection.localDescription, 'correlationId:', correlationId);
                    signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId, correlationId);
                }
            }
        });

        // As remote tracks are received, add them to the remote view
        peerConnection.addEventListener('track', event => {
            printSignalingLog('[MASTER] Received remote track from client', remoteClientId);
            addViewerTrackToMaster(remoteClientId, event.streams[0]);
        });

        // If there's no video/audio, master.localStream will be null. So, we should skip adding the tracks from it.
        if (master.localStream) {
            master.localStream.getTracks().forEach(track => peerConnection.addTrack(track, master.localStream));
        }
        await peerConnection.setRemoteDescription(offer);

        // Create an SDP answer to send back to the client
        printSignalingLog('[MASTER] Creating SDP answer for client', remoteClientId);
        await peerConnection.setLocalDescription(
            await peerConnection.createAnswer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            }),
        );

        // When trickle ICE is enabled, send the answer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
        if (formValues.useTrickleICE) {
            printSignalingLog('[MASTER] Sending SDP answer to client', remoteClientId);
            const correlationId = randomString();
            console.debug('SDP answer:', peerConnection.localDescription, 'correlationId:', correlationId);
            signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId, correlationId);
        }
        printSignalingLog('[MASTER] Generating ICE candidates for client', remoteClientId);

        // If in WebRTC ingestion mode, retry if no connection was established within 5 seconds.
        if (master.channelHelper.isIngestionEnabled()) {
            setTimeout(function() {
                // We check that it's not failed because if the state transitioned to failed,
                // the state change callback would handle this already
                if (
                    peerConnection.connectionState !== 'connected' &&
                    peerConnection.connectionState !== 'failed' &&
                    peerConnection.connectionState !== 'closed'
                ) {
                    console.error('[MASTER] Connection failed to establish within 5 seconds. Retrying...');
                    onPeerConnectionFailed(false);
                }
            }, 5000);
        }
    });

    signalingClient.on('iceCandidate', async (candidate, remoteClientId) => {
        printSignalingLog('[MASTER] Received ICE candidate from client', remoteClientId);
        console.debug('[MASTER] ICE candidate:', candidate);

        if (shouldAcceptCandidate(formValues, candidate)) {
            // Add the ICE candidate received from the client to the peer connection
            const peerConnection = master.peerConnectionByClientId[remoteClientId];
            peerConnection.addIceCandidate(candidate);
        } else {
            console.log('[MASTER] Not adding candidate from peer.');
        }
    });

    signalingClient.on('statusResponse', statusResponse => {
        if (statusResponse.success) {
            return;
        }
        console.error('[MASTER] Received response from Signaling:', statusResponse);

        if (master.channelHelper.isIngestionEnabled()) {
            console.error('[MASTER] Encountered a fatal error. Stopping the application.');
            onStop();
        }
    });

    signalingClient.on('close', () => {
        master.websocketOpened = false;
        master.runId++;
        console.log('[MASTER] Disconnected from signaling channel');
    });

    signalingClient.on('error', error => {
        console.error('[MASTER] Signaling client error', error);
    });
}

function onPeerConnectionFailed(printLostConnectionLog = true) {
    if (master.channelHelper.isIngestionEnabled()) {
        if (printLostConnectionLog) {
            console.warn('[MASTER] Lost connection to the storage session.');
        }
        master.connectionFailures.push(new Date().getTime());
        if (shouldStopRetryingJoinStorageSession()) {
            console.error(
                '[MASTER] Stopping the application after',
                maxConnectionFailuresWithinTenMinutesForRetries,
                `failed attempts to connect to the storage session within a 10-minute interval [${master.connectionFailures.map(date => new Date(date)).join(', ')}]. Exiting the application.`,
            );
            onStop();
            return;
        }

        console.warn('[MASTER] Reconnecting...');

        master.sdpOfferReceived = false;
        if (!master.websocketOpened) {
            console.log('[MASTER] Websocket is closed. Reopening...');
            master.channelHelper.getSignalingClient().open();
        } else {
            connectToMediaServer(++master.runId);
        }
    }
}

function stopMaster() {
    try {
        console.log('[MASTER] Stopping master connection');
        master.sdpOfferReceived = true;

        master.channelHelper.getSignalingClient()?.close();

        Object.keys(master.peerConnectionByClientId).forEach(clientId => {
            master.peerConnectionByClientId[clientId].close();
            removeViewerTrackFromMaster(clientId);
        });

        if (master.localStream) {
            master.localStream.getTracks().forEach(track => track.stop());
            master.localStream = null;
        }

        master.remoteStreams.forEach(remoteStream => remoteStream.getTracks().forEach(track => track.stop()));
        master.remoteStreams = [];

        if (master.peerConnectionStatsInterval) {
            clearInterval(master.peerConnectionStatsInterval);
            master.peerConnectionStatsInterval = null;
        }

        if (master.localView) {
            master.localView.srcObject = null;
        }

        if (master.remoteView) {
            master.remoteView.srcObject = null;
        }

        if (master.dataChannelByClientId) {
            master.dataChannelByClientId = {};
        }
    } catch (e) {
        console.error('[MASTER] Encountered error stopping', e);
    }
}

function sendMasterMessage(message) {
    if (message === '') {
        console.warn('[MASTER] Trying to send an empty message?');
        return false;
    }
    if (Object.keys(master.dataChannelByClientId).length === 0) {
        console.warn('[MASTER] No viewers have connected yet!');
        return false;
    }

    let sent = false;
    Object.keys(master.dataChannelByClientId).forEach(clientId => {
        try {
            master.dataChannelByClientId[clientId].send(message);
            console.log('[MASTER] Sent', message, 'to', clientId);
            sent = true;
        } catch (e) {
            console.error('[MASTER] Send DataChannel:', e.toString());
        }
    });
    return sent;
}

function printSignalingLog(message, clientId) {
    console.log(`${message}${clientId ? ': ' + clientId : ' (no senderClientId provided)'}`);
}

/**
 * Only applicable for WebRTC ingestion.
 * <p>
 * Calls JoinStorageSession API every {@link retryInterval} until an SDP offer is received over the signaling channel.
 * Since JoinStorageSession is an asynchronous API, there is a chance that even though 200 OK is received,
 * no message is sent on the websocket.
 * <p>
 * We will keep retrying JoinStorageSession until any of the items happens:
 *  * SDP offer is received (success)
 *  * Stop master button is clicked
 *  * Non-retryable error is encountered (e.g. auth error)
 *  * Websocket closes (times out after 10 minutes of inactivity). In this case, we reopen the Websocket and try again.
 * @param runId The current run identifier. If {@link master.runId} is different, we stop retrying.
 * @param kinesisVideoWebrtcStorageClient Kinesis Video Streams WebRTC Storage client.
 * @param channelARN The ARN of the signaling channel. It must have MediaStorage ENABLED.
 * @returns {Promise<boolean>} true if successfully joined, and sdp offer was received. false if not; this includes
 * when the {@link master.runId} is incremented during a retry attempt.
 */
async function callJoinStorageSessionUntilSDPOfferReceived(runId) {
    let firstTime = true; // Used for log messages
    let shouldRetryCallingJoinStorageSession = true;
    while (shouldRetryCallingJoinStorageSession && !master.sdpOfferReceived && master.runId === runId && master.websocketOpened) {
        if (!firstTime) {
            console.warn(`Did not receive SDP offer from Media Service. Retrying... (${++master.currentJoinStorageSessionRetries})`);
        }
        firstTime = false;
        try {
            // The AWS SDK for JS will perform limited retries on this API call.
            await master.channelHelper
                .getWebRTCStorageClient()
                .joinStorageSession({
                    channelArn: master.channelHelper.getChannelArn(),
                })
                .promise();
        } catch (e) {
            console.error(e);
            // We should only retry on ClientLimitExceededException, or internal failure. All other
            // cases e.g. IllegalArgumentException we should not retry.
            shouldRetryCallingJoinStorageSession =
                e.code === 'ClientLimitExceededException' || e.code === 'NetworkingError' || e.code === 'TimeoutError' || e.statusCode === 500;
        }
        await new Promise(resolve => setTimeout(resolve, calculateJoinStorageSessionDelayMilliseconds()));
    }
    return shouldRetryCallingJoinStorageSession && master.runId === runId && master.websocketOpened;
}

async function connectToMediaServer(masterRunId) {
    console.log('[MASTER] Joining storage session...');
    const success = await callJoinStorageSessionUntilSDPOfferReceived(masterRunId);
    if (success) {
        console.log('[MASTER] Join storage session API call(s) completed.');
    } else if (masterRunId === master.runId) {
        console.error('[MASTER] Error joining storage session');
    } else if (!master.websocketOpened && !master.sdpOfferReceived) {
        // TODO: ideally, we send a ping message. But, that's unavailable in browsers.
        console.log('[MASTER] Websocket is closed. Reopening...');
        master.channelHelper.getSignalingClient().open();
    }
}

/**
 * Check if we should stop retrying join storage session.
 * @returns {boolean} true if we exhausted the retries within a ten-minute window. false if we can continue retrying.
 */
function shouldStopRetryingJoinStorageSession() {
    const tenMinutesAgoEpochMillis = new Date().getTime() - millisecondsInTenMinutes;

    let front = master.connectionFailures[0];
    while (front && front < tenMinutesAgoEpochMillis) {
        master.connectionFailures.shift();
        front = master.connectionFailures[0];
    }

    return master.connectionFailures.length >= maxConnectionFailuresWithinTenMinutesForRetries;
}

/**
 * The delay between joinStorageSession retries (in milliseconds) is
 * retryIntervalForJoinStorageSession + min(rand(0, 1) * 200 * (currentRetryNumber)^2, 10_000)
 * @returns {number} How long to wait between joinStorageSession retries, in milliseconds
 */
function calculateJoinStorageSessionDelayMilliseconds() {
    return retryIntervalForJoinStorageSession + Math.min(Math.random() * Math.pow(200, master.currentJoinStorageSessionRetries - 1), 10_000);
}