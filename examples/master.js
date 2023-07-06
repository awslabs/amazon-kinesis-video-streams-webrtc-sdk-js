/**
 * This file demonstrates the process of starting WebRTC streaming using a KVS Signaling Channel.
 */
const master = {
    kinesisVideoClient: null,
    signalingClient: null,
    storageClient: null,
    channelARN: null,
    streamARN: null,
    peerConnectionByClientId: {},
    dataChannelByClientId: {},
    localStream: null,
    remoteStreams: [],
    peerConnectionStatsInterval: null,
};

async function startMaster(localView, remoteView, formValues, onStatsReport, onRemoteDataMessage) {
    try {
        master.localView = localView;
        master.remoteView = remoteView;

        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
            correctClockSkew: true,
        });
        master.kinesisVideoClient = kinesisVideoClient;

        // Get signaling channel ARN
        const describeSignalingChannelResponse = await kinesisVideoClient
            .describeSignalingChannel({
                ChannelName: formValues.channelName,
            })
            .promise();
        const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
        console.log('[MASTER] Channel ARN:', channelARN);

        master.channelARN = channelARN;

        const protocols = ['WSS', 'HTTPS'];
        if (formValues.ingestMedia) {
            if (!formValues.sendAudio || !formValues.sendVideo) {
                console.error('[MASTER] Both Send Video and Send Audio checkboxes need to be checked to ingest media.');
                return;
            }

            const describeMediaStorageConfigurationResponse = await kinesisVideoClient
                .describeMediaStorageConfiguration({
                    ChannelARN: master.channelARN,
                })
                .promise();
            const mediaStorageConfiguration = describeMediaStorageConfigurationResponse.MediaStorageConfiguration;

            if (mediaStorageConfiguration.Status !== 'ENABLED' || mediaStorageConfiguration.StreamARN === null) {
                console.error('[MASTER] The media storage configuration is not yet configured for this channel.');
                return;
            }

            master.streamARN = mediaStorageConfiguration.StreamARN;
            console.log(`[MASTER] Stream ARN: ${master.streamARN}`);

            protocols.push('WEBRTC');
        } else {
            master.streamARN = null;
        }

        // Get signaling channel endpoints
        const getSignalingChannelEndpointResponse = await kinesisVideoClient
            .getSignalingChannelEndpoint({
                ChannelARN: channelARN,
                SingleMasterChannelEndpointConfiguration: {
                    Protocols: protocols,
                    Role: KVSWebRTC.Role.MASTER,
                },
            })
            .promise();
        const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
            endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
            return endpoints;
        }, {});
        console.log('[MASTER] Endpoints:', endpointsByProtocol);

        // Create Signaling Client
        master.signalingClient = new KVSWebRTC.SignalingClient({
            channelARN,
            channelEndpoint: endpointsByProtocol.WSS,
            role: KVSWebRTC.Role.MASTER,
            region: formValues.region,
            credentials: {
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
            },
            systemClockOffset: kinesisVideoClient.config.systemClockOffset,
        });

        if (formValues.ingestMedia) {
            master.storageClient = new AWS.KinesisVideoWebRTCStorage({
                region: formValues.region,
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
                endpoint: endpointsByProtocol.WEBRTC,
            });
        }

        // Get ICE server configuration
        const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: endpointsByProtocol.HTTPS,
            correctClockSkew: true,
        });
        const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
            .getIceServerConfig({
                ChannelARN: channelARN,
            })
            .promise();
        const iceServers = [];
        // Don't add stun if user selects TURN only or NAT traversal disabled
        if (!formValues.natTraversalDisabled && !formValues.forceTURN) {
            iceServers.push({ urls: `stun:stun.kinesisvideo.${formValues.region}.amazonaws.com:443` });
        }

        // Don't add turn if user selects STUN only or NAT traversal disabled
        if (!formValues.natTraversalDisabled && !formValues.forceSTUN) {
            getIceServerConfigResponse.IceServerList.forEach(iceServer =>
                iceServers.push({
                    urls: iceServer.Uris,
                    username: iceServer.Username,
                    credential: iceServer.Password,
                }),
            );
        }
        console.log('[MASTER] ICE servers:', iceServers);

        const configuration = {
            iceServers,
            iceTransportPolicy: formValues.forceTURN ? 'relay' : 'all',
        };

        const resolution = formValues.widescreen
            ? {
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
              }
            : { width: { ideal: 640 }, height: { ideal: 480 } };
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
        }

        master.signalingClient.on('open', async () => {
            console.log('[MASTER] Connected to signaling service');
            if (formValues.ingestMedia && master.streamARN) {
                try {
                    console.log('[MASTER] Joining storage session...');
                    await master.storageClient
                        .joinStorageSession({
                            channelArn: master.channelARN,
                        })
                        .promise();

                    console.log('[MASTER] Joined storage session. Media is being recorded to', master.streamARN);
                } catch (e) {
                    console.error('[MASTER] Error joining storage session', e);
                }
            }
        });

        master.signalingClient.on('sdpOffer', async (offer, remoteClientId) => {
            printSignalingLog('[MASTER] Received SDP offer from client', remoteClientId);
            console.debug('SDP offer:', offer);

            // Create a new peer connection using the offer from the given client
            const peerConnection = new RTCPeerConnection(configuration);
            master.peerConnectionByClientId[remoteClientId] = peerConnection;

            if (formValues.openDataChannel) {
                master.dataChannelByClientId[remoteClientId] = peerConnection.createDataChannel('kvsDataChannel');
                peerConnection.ondatachannel = event => {
                    event.channel.onmessage = onRemoteDataMessage;
                };
            }

            // Poll for connection stats
            if (!master.peerConnectionStatsInterval) {
                master.peerConnectionStatsInterval = setInterval(() => peerConnection.getStats().then(onStatsReport), 10000);
            }

            peerConnection.addEventListener('connectionstatechange', async event => {
                printPeerConnectionStateInfo(event, '[MASTER]', remoteClientId);
            });

            // Send any ICE candidates to the other peer
            peerConnection.addEventListener('icecandidate', ({ candidate }) => {
                if (candidate) {
                    printSignalingLog('[MASTER] Generated ICE candidate for client', remoteClientId);
                    console.debug('ICE candidate:', candidate);

                    // When trickle ICE is enabled, send the ICE candidates as they are generated.
                    if (formValues.useTrickleICE) {
                        printSignalingLog('[MASTER] Sending ICE candidate to client', remoteClientId);
                        master.signalingClient.sendIceCandidate(candidate, remoteClientId);
                    }
                } else {
                    printSignalingLog('[MASTER] All ICE candidates have been generated for client', remoteClientId);

                    // When trickle ICE is disabled, send the answer now that all the ICE candidates have ben generated.
                    if (!formValues.useTrickleICE) {
                        printSignalingLog('[MASTER] Sending SDP answer to client', remoteClientId);
                        console.debug('SDP answer:', peerConnection.localDescription);
                        master.signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId);
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
                console.debug('SDP answer:', peerConnection.localDescription);
                master.signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId);
            }
            printSignalingLog('[MASTER] Generating ICE candidates for client', remoteClientId);
        });

        master.signalingClient.on('iceCandidate', async (candidate, remoteClientId) => {
            printSignalingLog('[MASTER] Received ICE candidate from client', remoteClientId);
            console.debug('[MASTER] ICE candidate:', candidate);

            // Add the ICE candidate received from the client to the peer connection
            const peerConnection = master.peerConnectionByClientId[remoteClientId];
            peerConnection.addIceCandidate(candidate);
        });

        master.signalingClient.on('close', () => {
            console.log('[MASTER] Disconnected from signaling channel');
        });

        master.signalingClient.on('error', error => {
            console.error('[MASTER] Signaling client error', error);
        });

        console.log('[MASTER] Starting master connection');
        master.signalingClient.open();
    } catch (e) {
        console.error('[MASTER] Encountered error starting:', e);
    }
}

function stopMaster() {
    try {
        console.log('[MASTER] Stopping master connection');
        if (master.signalingClient) {
            master.signalingClient.close();
            master.signalingClient = null;
        }

        Object.keys(master.peerConnectionByClientId).forEach(clientId => {
            master.peerConnectionByClientId[clientId].close();
            removeViewerTrackFromMaster(clientId);
        });
        master.peerConnectionByClientId = [];

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
