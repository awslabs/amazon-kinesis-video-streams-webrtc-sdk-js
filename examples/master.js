/**
 * This file demonstrates the process of starting WebRTC streaming using a KVS Signaling Channel.
 */
const masterDefaults = {
    kinesisVideoClient: null,
    signalingClient: null,
    storageClient: null,
    channelARN: null,
    peerByClientId: {},
    localStream: null,
    peerConnectionStatsInterval: null,
    runId: 0,
    sdpOfferReceived: false,
    websocketOpened: false,
    connectionFailures: [], // Dates of when PeerConnection transitions to failed state.
    currentJoinStorageSessionRetries: 0,
};

let master = {};

const ingestionWithMultiViewerSupportPreviewRegions = ['us-east-1'];

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
const maxAPICallRetriesPerConnectionAttempt = 5;

const millisecondsInTenMinutes = 600_000;

async function startMaster(localView, remoteView, formValues, onStatsReport, onRemoteDataMessage) {
    const role = ROLE;
    master = {...masterDefaults};
    master.clientId = formValues.clientId;

    try {
        master.localView = localView;
        master.remoteView = remoteView;

        // Determine the media ingestion mode
        let ingestionMode = ChannelHelper.IngestionMode.OFF;
        if (formValues.autoDetermineMediaIngestMode) {
            ingestionMode = ChannelHelper.IngestionMode.DETERMINE_THROUGH_DESCRIBE;
        } else if (formValues.mediaIngestionModeOverride) {
            ingestionMode = ChannelHelper.IngestionMode.ON;
        }

        master.channelHelper = channelHelper || new ChannelHelper(
            formValues.channelName,
            {
                region: formValues.region,
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
            },
            formValues.endpoint,
            role,
            ingestionMode,
            `[${role}]`,
            role === 'VIEWER' ? formValues.clientId : undefined,
        );

        await master.channelHelper.init();

        if (master.channelHelper.isIngestionEnabled()) {
            if (role === 'MASTER' && (!formValues.sendAudio || !formValues.sendVideo)) {
                console.error(`[MASTER] Both Send Video and Send Audio checkboxes need to be checked to ingest and store media.`);
                return;
            } else if (role === 'VIEWER' && formValues.sendVideo) {
                console.warn(`[VIEWER] Not allowed to send video. Overriding to false!`);
                formValues.sendVideo = false;
            }

            if (formValues.openDataChannel) {
                console.warn(`[${role}] DataChannel is not supported for WebRTC ingestion. Overriding value to false.`);
                formValues.openDataChannel = false;
                $('.datachannel').addClass('d-none');
            }

            master.channelHelper.getWebRTCStorageClient().config.maxRetries = 0;
            master.channelHelper.getWebRTCStorageClient().config.httpOptions.timeout = retryIntervalForJoinStorageSession;
        } else {
            console.log(`[${role}] Not using media ingestion feature.`);
        }

        const iceServers = [];

        // Add the STUN server unless it is disabled
        if (!formValues.natTraversalDisabled && !formValues.forceTURN && (formValues.sendSrflxCandidates || formValues.sendPrflxCandidates)) {
            iceServers.push({urls: `stun:stun.kinesisvideo.${formValues.region}.amazonaws.com:443`});
        }

        // Add the TURN servers unless it is disabled
        if (!formValues.natTraversalDisabled && !formValues.forceSTUN && formValues.sendRelayCandidates) {
            iceServers.push(...(await master.channelHelper.fetchTurnServers()));
        }
        console.log(`[${role}]`, 'ICE servers:', iceServers);

        const configuration = {
            iceServers,
            iceTransportPolicy: formValues.forceTURN ? 'relay' : 'all',
        };

        // Get a stream from the webcam and display it in the local view.
        // If no video/audio needed, no need to request for the sources.
        // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.
        if (formValues.sendVideo || formValues.sendAudio) {
            let type;
            if (formValues.sendVideo && formValues.sendAudio) {
                type = MediaHelper.MediaRequestType.AUDIO_AND_VIDEO;
            } else if (formValues.sendVideo) {
                type = MediaHelper.MediaRequestType.VIDEO_ONLY;
            } else {
                type = MediaHelper.MediaRequestType.AUDIO_ONLY;
            }

            master.localStream = await MediaHelper.requestCamera(type, formValues.widescreen ? 1280 : 640, formValues.widescreen ? 720 : 480)
            localView.srcObject = master.localStream;

            if (!master.localStream) {
                $('#stop-master-button').click();
                return;
            }
        }

        registerMasterSignalingClientCallbacks(master.channelHelper.getSignalingClient(), formValues, configuration, onStatsReport, onRemoteDataMessage);
        console.log(`[${role}] Starting ${role.toLowerCase()} connection`);
        master.channelHelper.getSignalingClient().open();
    } catch (e) {
        console.error(`[${role}] Encountered error starting:`, e);
        $('#stop-master-button').click();
    }
}

registerMasterSignalingClientCallbacks = (signalingClient, formValues, configuration, onStatsReport, onRemoteDataMessage) => {
    const role = ROLE;

    signalingClient.on('open', async () => {
        const runId = ++master.runId;
        master.websocketOpened = true;
        const signalingConnected = new Date();
        console.debug(`[${role}] ConnectAs${role[0].toUpperCase() + role.slice(1).toLowerCase()} completed at`, signalingConnected);
        console.log(`[${role}] Connected to signaling service`);
        console.log(
            `[${role}] Time to connect to signaling:`,
            signalingConnected.getTime() - master.channelHelper.getSignalingConnectionLastStarted().getTime(),
            'ms',
        );

        if (!formValues.autoDetermineMediaIngestMode && role === 'MASTER' && formValues.mediaIngestionModeOverride && formValues.showJSSButton) {
            $('#join-storage-session-button').removeClass('d-none');
            console.log(`[MASTER] Waiting for media ingestion and storage peer to join... (click the button!)`);
        } else if (!formValues.autoDetermineMediaIngestMode && role === 'VIEWER' && formValues.mediaIngestionModeOverride && formValues.showJSSAsViewerButton) {
            $('#join-storage-session-as-viewer-button').removeClass('d-none');
            console.log(`[VIEWER] Waiting for media ingestion and storage peer to join... (click the button!)`);
        } else if (master.channelHelper.isIngestionEnabled()) {
            if (role === 'VIEWER' && !ingestionWithMultiViewerSupportPreviewRegions.includes(formValues.region) && !formValues.endpoint) {
                console.error(
                    `WebRTC ingestion with multi-viewer support is not supported in ${
                        formValues.region
                    }. It is available for preview in ${ingestionWithMultiViewerSupportPreviewRegions.join(',')}!`,
                );
                onStop();
                return;
            }
            await connectToMediaServer(runId, master.channelHelper.getChannelArn(), master.channelHelper.getWebRTCStorageClient());
        } else {
            console.log(`[${role}] Waiting for peers to join...`);
        }
    });

    signalingClient.on('sdpOffer', async (offer, remoteClientId) => {
        console.log(`[${role}] Received SDP offer from`, remoteClientId || 'remote');
        master.sdpOfferReceived = true;
        master.currentJoinStorageSessionRetries = 0;
        console.debug('SDP offer:', offer);

        // Close the previous peer connection in case peer with the same clientId sends another one
        if (master.peerByClientId[remoteClientId] && master.peerByClientId[remoteClientId].getPeerConnection().connectionState !== 'closed') {
            master.peerByClientId[remoteClientId].close();
            console.log(`[${role}] Close previous connection`);
        }

        const answerer = new Answerer(
            configuration,
            master.localStream,
            offer,
            remoteClientId,
            master.channelHelper.getSignalingClient(),
            formValues.useTrickleICE,
            formValues.openDataChannel,
            `[${role}]`,
            iceCandidate => shouldSendIceCandidate(formValues, iceCandidate),
            iceCandidate => shouldAcceptCandidate(formValues, iceCandidate),
            mediaStreams => addViewerMediaStreamToMaster(remoteClientId, mediaStreams[0]),
            dataChannelMessage => onRemoteDataMessage(dataChannelMessage),
        );

        await answerer.init();

        master.peerByClientId[remoteClientId] = answerer;

        answerer.getPeerConnection().addEventListener('connectionstatechange', async event => {
            printPeerConnectionStateInfo(event, `[${role}]`, remoteClientId);

            if (master.channelHelper.isIngestionEnabled() && event.target.connectionState === 'connected') {
                if (role === 'MASTER') {
                    console.log(
                        `[MASTER] Successfully joined the storage session. Media is being recorded to`,
                        master.channelHelper.getStreamArn() ?? 'Kinesis Video Streams',
                    );
                } else {
                    console.log(
                        `[VIEWER] Successfully joined the storage session. If master is present, media will be recorded to`,
                        master.channelHelper.getStreamArn() ?? 'Kinesis Video Streams',
                    );
                }
            }
        });

        // If in WebRTC ingestion mode, retry if no connection was established within 5 seconds.
        if (master.channelHelper.isIngestionEnabled()) {
            setTimeout(function () {
                // We check that it's not failed because if the state transitioned to failed,
                // the state change callback would handle this already
                if (
                    answerer.getPeerConnection().connectionState !== 'connected' &&
                    answerer.getPeerConnection().connectionState !== 'failed' &&
                    answerer.getPeerConnection().connectionState !== 'closed'
                ) {
                    console.error(`[${role}] Connection failed to establish within 5 seconds. Retrying...`);
                    onPeerConnectionFailed(remoteClientId, false, false);
                }
            }, 5000);
        }
    });

    signalingClient.on('statusResponse', statusResponse => {
        if (statusResponse.success) {
            return;
        }
        console.error(`[${role}] Received response from Signaling:`, statusResponse);

        if (master.channelHelper.isIngestionEnabled()) {
            console.error(`[${role}] Encountered a fatal error. Stopping the application.`);
            $('#stop-master-button').click();
        }
    });

    signalingClient.on('close', () => {
        master.websocketOpened = false;
        master.runId++;
        console.log(`[${role}] Disconnected from signaling channel`);
    });

    signalingClient.on('error', error => {
        console.error(`[${role}] Signaling client error`, error);
    });
};

function onPeerConnectionFailed(remoteClientId, printLostConnectionLog = true, hasConnectedAlready = true) {
    const role = ROLE;
    if (master?.channelHelper.isIngestionEnabled()) {
        if (printLostConnectionLog) {
            console.warn(`[${ROLE}] Lost connection to the storage session.`);
        }
        master?.connectionFailures?.push(new Date().getTime());
        if (hasConnectedAlready && role === 'VIEWER') {
            $('#stop-master-button').click();
            return;
        }
        if (shouldStopRetryingJoinStorageSession()) {
            console.error(
                `[${role}] Stopping the application after`,
                maxConnectionFailuresWithinTenMinutesForRetries,
                `failed attempts to connect to the storage session within a 10-minute interval [${master?.connectionFailures
                    .map(date => new Date(date))
                    .join(', ')}]. Exiting the application.`,
            );
            $('#stop-master-button').click();
            return;
        }

        console.warn(`[${role}] Reconnecting...`);

        master.sdpOfferReceived = false;
        if (!master.websocketOpened) {
            const channelHelper = master.channelHelper;
            if (channelHelper) {
                console.log(`[${role}] Websocket is closed. Reopening...`);
                channelHelper.getSignalingClient().open();
            }
        } else {
            connectToMediaServer(++master.runId);
        }
    } else if (master.channelHelper) {
        master.peerByClientId[remoteClientId]?.close();
        delete master.peerByClientId[remoteClientId];
    }
}

function stopMaster() {
    const role = ROLE;
    try {
        console.log(`[${role}] Stopping ${role} connection`);
        master.sdpOfferReceived = true;

        master.channelHelper?.getSignalingClient()?.close();

        Object.keys(master.peerByClientId).forEach(clientId => {
            master.peerByClientId[clientId].close();
            removeViewerTrackFromMaster(clientId);
            delete master.peerByClientId[clientId];
        });

        if (master.localStream) {
            master.localStream.getTracks().forEach(track => track.stop());
            master.localStream = null;
        }

        if (master.localView) {
            master.localView.srcObject = null;
        }

        if (master.peerConnectionStatsInterval) {
            clearInterval(master.peerConnectionStatsInterval);
            master.peerConnectionStatsInterval = null;
        }

        if (master.remoteView) {
            master.remoteView.srcObject = null;
        }

        master = {};
    } catch (e) {
        console.error(`[${role}] Encountered error stopping`, e);
    }
}

function sendMasterMessage(message) {
    const role = ROLE;
    if (message === '') {
        console.warn(`[${role}] Trying to send an empty message?`);
        return false;
    }
    if (Object.values(master.peerByClientId).filter(answerer => answerer.isDataChannelOpen()).length === 0) {
        console.warn(`[${role}] No one to send it to!`);
        return false;
    }

    let sent = false;
    for (const [clientId, answerer] of Object.entries(master.peerByClientId)) {
        try {
            answerer.sendDataChannelMessage(message);
            console.log(`[${role}]`, 'Sent', message, 'to', clientId);
            sent = true;
        } catch (e) {
            console.error(`[${role}]`, 'Send DataChannel:', e.toString());
        }
    }
    return sent;
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
            if (ROLE === 'MASTER') {
                await master.channelHelper
                    .getWebRTCStorageClient()
                    .joinStorageSession({
                        channelArn: master.channelHelper.getChannelArn(),
                    })
                    .promise();
            } else {
                await master.channelHelper
                    .getWebRTCStorageClient()
                    .joinStorageSessionAsViewer({
                        channelArn: master.channelHelper.getChannelArn(),
                        clientId: master.clientId,
                    })
                    .promise();
            }
        } catch (e) {
            console.error(e);
            // We should only retry on ClientLimitExceededException, or internal failure. All other
            // cases e.g. IllegalArgumentException we should not retry.
            shouldRetryCallingJoinStorageSession = (
                    // ClientLimitExceededException is thrown for hitting TPS limit (rate limit),
                    // but also for hitting the maximum number of viewers in a session. For TPS limit, we want to retry.
                    // But for maximum number of viewers, we should not automatically retry.
                    e.code === 'ClientLimitExceededException' && !e.message?.toLowerCase().includes('maximum number of viewers connected to the session') ||
                    // We should retry if the device loses connectivity
                    e.code === 'NetworkingError' ||
                    // We should retry if the request to the service timed out
                    e.code === 'TimeoutError' ||
                    // We should retry if there's an internal error
                    e.statusCode === 500
                );
        }
        shouldRetryCallingJoinStorageSession = shouldRetryCallingJoinStorageSession && master.currentJoinStorageSessionRetries <= maxAPICallRetriesPerConnectionAttempt;
        await new Promise(resolve => setTimeout(resolve, calculateJoinStorageSessionDelayMilliseconds()));
    }
    return shouldRetryCallingJoinStorageSession && master.runId === runId && master.websocketOpened;
}

async function connectToMediaServer(runId) {
    const role = ROLE;
    console.log(`[${role}]`, `Joining storage session${role === 'VIEWER' ? ' as viewer' : ''}...`);
    const success = await callJoinStorageSessionUntilSDPOfferReceived(runId);
    if (success) {
        console.log(`[${role}]`, `Join storage session ${role === 'VIEWER' ? 'as viewer ' : ''}API call(s) completed.`);
    } else if (runId === master.runId) {
        console.error(`[${role}]`, `Error joining storage session${role === 'VIEWER' ? ' as viewer' : ''}`);
        $('#stop-master-button').click();
    } else if (!master.websocketOpened && !master.sdpOfferReceived) {
        // TODO: ideally, we send a ping message. But, that's unavailable in browsers.
        const signalingClient = master.channelHelper?.getSignalingClient();
        if (signalingClient) {
            console.log(`[${role}]`, 'Websocket is closed. Reopening...');
            signalingClient.open();
        }
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
