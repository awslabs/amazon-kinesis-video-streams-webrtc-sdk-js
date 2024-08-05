/**
 * This file demonstrates the process of starting WebRTC streaming using a KVS Signaling Channel.
 */
let viewer = {};

//globals for DQP metrics and test
const profilingTestLength = 20;
const DQPtestLength = 10; //test time in seconds
let viewerButtonPressed = 0;
let initialDate = 0;
let statStartTime = 0;
let chart = {};
let vTimeStampPrev = 0;
let aTimeStampPrev = 0;
let vBytesPrev = 0;
let vFDroppedPrev = 0;
let aBytesPrev = 0;
let profilingStartTime = 0;
let statStartDate = 0;
let rttSum = 0;
let vjitterSum = 0;
let ajitterSum = 0;
let framerateSum = 0;
let framedropPerSum = 0;
let vBitrateSum = 0;
let aBitrateSum = 0;
let count = 0;
let testAvgRTT = 0;
let testAvgFPS = 0;
let testAvgDropPer = 0;
let testAvgVbitrate = 0;
let testAvgVjitter = 0;
let testAvgAbitrate = 0;
let testAvgAjitter = 0;
let decodedFPSArray = [];
let droppedFramePerArray = [];
let videoBitRateArray = [];
let audioRateArray = [];
let timeArray = [];
let chartHeight = 0;

let signalingSetUpTime = 0;
let timeToSetUpViewerMedia = 0;
let timeToFirstFrameFromOffer = 0;
let timeToFirstFrameFromViewerStart = 0;

let metrics = {
    viewer: {
        waitTime: {
            name: 'viewer-waiting-for-master',
            startTime: '',
            endTime: '',
            tooltip: 'Time duration the viewer was waiting for the master to start (time to start the SDK after the viewer signaling channel was connected)',
            color: 'yellow',
        },
        signaling: {
            name: 'signaling-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to establish a signaling connection on the viewer-side',
            color: '#F44336',
        },
        setupMediaPlayer: {
            name: 'setup-media-player-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to setup a media player on the viewer-side by seeking permissions for mic / camera (if needed), fetch tracks from the same and add them to the peer connection',
            color: '#9575CD',
        },
        offAnswerTime: {
            name: 'sdp-exchange-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to send an offer and receive a response',
            color: '#FF6F00',
        },
        describeChannel: {
            name: 'signaling-viewer-describe-channel',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken for the API call to describeSignalingChannel on the viewer',
            color: '#EF9A9A',
        },
        describeMediaStorageConfiguration: {
            name: 'signaling-viewer-describe-media-storage-config',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken for the API call to describeSignalingChannel on the viewer',
            color: '#EF9A9A',
        },
        channelEndpoint: {
            name: 'signaling-viewer-get-signaling-channel-endpoint',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken for the API call to getSignalingChannelEndpoint on the viewer',
            color: '#EF9A9A',
        },
        iceServerConfig: {
            name: 'signaling-viewer-get-ice-server-config',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken for the API call to getIceServerConfig on the viewer',
            color: '#EF9A9A',
        },
        signConnectAsViewer: {
            name: 'sign-connect-as-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to sign the websocket request via connectAsViewer',
            color: '#EF9A9A',
        },
        connectAsViewer: {
            name: 'signaling-connect-as-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to open the websocket via connectAsViewer',
            color: '#EF9A9A',
        },
        iceGathering: {
            name: 'ice-gathering-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to gather all ice candidates on the viewer',
            color: '#90CAF9',
        },
        peerConnection: {
            name: 'pc-establishment-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to establish the peer connection on the viewer',
            color: '#2196F3',
        },
        ttffAfterPc: {
            name: 'ttff-after-pc-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time to first frame after the viewer\'s peer connection has been established',
            color: '#2196F3',
        },
        ttff: {
            name: 'ttff',
            startTime: '',
            endTime: '',
            tooltip: 'Time to first frame since the viewer button was clicked',
            color: '#4CAF50',
        },
        dataChannel: {
            name: 'datachannel-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to send a message to the master and receive a response back',
            color: '#4CAF50',
        }
    },
    master: {
        waitTime: {
            name: 'master-waiting-for-viewer',
            startTime: '',
            endTime: '',
            tooltip: 'Time duration the master was waiting for the viewer to start (time to click the button after the master signaling channel was connected)',
            color: 'yellow',
        },
        signaling: {
            name: 'signaling-master',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to establish a signaling connection on the master-side',
            color: '#F44336',
        },
        offAnswerTime: {
            name: 'sdp-exchange-master',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to respond to an offer from the viewer with an answer',
            color: '#FF6F00',
        },
        describeChannel: {
            name: 'signaling-master-describe-channel',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken for the API call to desribeSignalingChannel on the master',
            color: '#EF9A9A',
        },
        channelEndpoint: {
            name: 'signaling-master-get-signaling-channel-endpoint',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken for the API call to getSignalingChannelEndpoint on the master',
            color: '#EF9A9A',
        },
        iceServerConfig: {
            name: 'signaling-master-get-ice-server-config',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken for the API call to getIceServerConfig on the master',
            color: '#EF9A9A',
        },
        getToken: {
            name: 'signaling-master-get-token',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken for the getToken call on the master',
            color: '#EF9A9A',
        },
        createChannel: {
            name: 'signaling-master-create-channel',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken createChannel API call on the master',
            color: '#EF9A9A',
        },
        connectAsMaster: {
            name: 'signaling-master-connect',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken for the signaling connect on the master',
            color: '#EF9A9A',
        },
        iceGathering: {
            name: 'ice-gathering-master',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to gather all ice candidates on the master',
            color: '#90CAF9',
        },
        peerConnection: {
            name: 'pc-establishment-master',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to establish the peer connection on the master',
            color: '#2196F3',
        },
        dataChannel: {
            name: 'datachannel-master',
            startTime: '',
            endTime: '',
            tooltip: 'Time taken to send a message to the viewer and receive a response back',
            color: '#4CAF50',
        },
        ttffAfterPc: {
            name: 'ttff-after-pc-master',
            startTime: '',
            endTime: '',
            tooltip: 'Time to first frame after the master\'s peer connection has been established',
            color: '#2196F3',
        }
    }
};

let dataChannelLatencyCalcMessage = {
    'content': 'Opened data channel by viewer',
    'firstMessageFromViewerTs': '',
    'firstMessageFromMasterTs': '',
    'secondMessageFromViewerTs': '',
    'secondMessageFromMasterTs': '',
    'lastMessageFromViewerTs': ''
}

async function startViewer(localView, remoteView, formValues, onStatsReport, remoteMessage) {
    try {
        console.log('[VIEWER] Client id is:', formValues.clientId);
        viewerButtonPressed = new Date();

        if (formValues.enableProfileTimeline) {
            setTimeout(profilingCalculations, profilingTestLength * 1000);
        }

        viewer.localView = localView;
        viewer.remoteView = remoteView;

        viewer.remoteView.addEventListener('loadeddata', () => {
            metrics.viewer.ttff.endTime = Date.now();
            if (formValues.enableProfileTimeline) {
                metrics.viewer.ttffAfterPc.endTime = metrics.viewer.ttff.endTime;
                metrics.master.ttffAfterPc.endTime = metrics.viewer.ttff.endTime;


                // if the ice-gathering on the master side is not complete by the time the metrics are sent, the endTime > startTime
                // in order to plot it, we can show it as an ongoing process
                if (metrics.master.iceGathering.startTime > metrics.master.iceGathering.endTime) {
                    metrics.master.iceGathering.endTime = metrics.viewer.ttff.endTime;
                }
            }
            if(formValues.enableDQPmetrics) {
                timeToFirstFrameFromOffer = metrics.viewer.ttff.endTime - metrics.viewer.offAnswerTime.startTime;
                timeToFirstFrameFromViewerStart = metrics.viewer.ttff.endTime - viewerButtonPressed.getTime();
            }
        });

        if (formValues.enableProfileTimeline) {
            metrics.viewer.ttff.startTime = viewerButtonPressed.getTime();
            metrics.master.waitTime.endTime = viewerButtonPressed.getTime();
        }

        if (formValues.enableDQPmetrics) {
            console.log('[WebRTC] DQP METRICS TEST STARTED: ', viewerButtonPressed);

            let htmlString = '<table><tr><strong><FONT COLOR=RED>Connecting to MASTER...</FONT></strong></tr></table>';
            //update the page divs
            $('#dqp-test')[0].innerHTML = htmlString;
            htmlString = ' ';
            $('#webrtc-live-stats')[0].innerHTML = htmlString;

            decodedFPSArray = [];
            droppedFramePerArray = [];
            videoBitRateArray = [];
            audioRateArray = [];
            timeArray = [];

            chart = new Chart('metricsChart', {
                type: 'line',
                data: {
                    labels: timeArray,
                    datasets: [
                        {
                            label: 'Decoded FPS',
                            borderColor: 'blue',
                            backgroundColor: 'blue',
                            fill: false,
                            data: decodedFPSArray,
                        },
                        {
                            label: 'Frames Dropped (%)',
                            borderColor: 'red',
                            backgroundColor: 'red',
                            fill: false,
                            data: droppedFramePerArray,
                        },
                        {
                            label: 'Video Bitrate (kbps)',
                            borderColor: 'green',
                            backgroundColor: 'green',
                            fill: false,
                            data: videoBitRateArray,
                        },
                        {
                            label: 'Audio Bitrate (kbps)',
                            borderColor: 'orange',
                            backgroundColor: 'orange',
                            fill: false,
                            data: audioRateArray,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }

        metrics.viewer.signaling.startTime = Date.now();

        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
            correctClockSkew: true,
        });

        // Get signaling channel ARN
        metrics.viewer.describeChannel.startTime = Date.now();

        const describeSignalingChannelResponse = await kinesisVideoClient
            .describeSignalingChannel({
                ChannelName: formValues.channelName,
            })
            .promise();

        metrics.viewer.describeChannel.endTime = Date.now();

        const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
        console.log('[VIEWER] Channel ARN:', channelARN);

        if (formValues.autoDetermineMediaIngestMode) {
            console.log('[VIEWER] Determining whether this signaling channel is in media ingestion mode.');

            metrics.viewer.describeMediaStorageConfiguration.startTime = Date.now();

            const mediaStorageConfiguration = await kinesisVideoClient
                .describeMediaStorageConfiguration({
                    ChannelName: formValues.channelName,
                })
                .promise();

            metrics.viewer.describeMediaStorageConfiguration.endTime = Date.now();

            if (mediaStorageConfiguration.MediaStorageConfiguration.Status !== 'DISABLED') {
                console.error(
                    '[VIEWER] Media storage and ingestion is ENABLED for this channel. Only the WebRTC Ingestion and Storage peer can join as a viewer.',
                );
                return;
            }
        } else {
            console.log('[VIEWER] Not using media ingestion feature');
        }

        // Get signaling channel endpoints

        metrics.viewer.channelEndpoint.startTime = Date.now();

        const getSignalingChannelEndpointResponse = await kinesisVideoClient
            .getSignalingChannelEndpoint({
                ChannelARN: channelARN,
                SingleMasterChannelEndpointConfiguration: {
                    Protocols: ['WSS', 'HTTPS'],
                    Role: KVSWebRTC.Role.VIEWER,
                },
            })
            .promise();

        metrics.viewer.channelEndpoint.endTime = Date.now();

        const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
            endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
            return endpoints;
        }, {});
        console.log('[VIEWER] Endpoints:', endpointsByProtocol);

        const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: endpointsByProtocol.HTTPS,
            correctClockSkew: true,
        });

        // Get ICE server configuration

        metrics.viewer.iceServerConfig.startTime = Date.now();

        const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
            .getIceServerConfig({
                ChannelARN: channelARN,
            })
            .promise();

        metrics.viewer.iceServerConfig.endTime = Date.now();

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
        console.log('[VIEWER] ICE servers:', iceServers);

        // Create Signaling Client
        viewer.signalingClient = new KVSWebRTC.SignalingClient({
            channelARN,
            channelEndpoint: endpointsByProtocol.WSS,
            clientId: formValues.clientId,
            role: KVSWebRTC.Role.VIEWER,
            region: formValues.region,
            credentials: {
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
            },
            requestSigner: {
                getSignedURL: async function(signalingEndpoint, queryParams, date) {
                    const signer = new KVSWebRTC.SigV4RequestSigner(formValues.region, {
                        accessKeyId: formValues.accessKeyId,
                        secretAccessKey: formValues.secretAccessKey,
                        sessionToken: formValues.sessionToken,
                    });

                    metrics.viewer.signConnectAsViewer.startTime = Date.now();
                    console.debug('[VIEWER] Signing the url started at', new Date(metrics.viewer.signConnectAsViewer.startTime));
                    const retVal = await signer.getSignedURL(signalingEndpoint, queryParams, date);
                    metrics.viewer.signConnectAsViewer.endTime = Date.now();
                    console.debug('[VIEWER] Signing the url ended at', new Date(metrics.viewer.signConnectAsViewer.endTime));
                    console.log('[VIEWER] Time to sign the request:', metrics.viewer.signConnectAsViewer.endTime - metrics.viewer.signConnectAsViewer.startTime, 'ms');
                    metrics.viewer.connectAsViewer.startTime = Date.now();
                    console.log('[VIEWER] Connecting to KVS Signaling...');
                    console.debug('[VIEWER] ConnectAsViewer started at', new Date(metrics.viewer.connectAsViewer.startTime));
                    return retVal;
                },
            },
            systemClockOffset: kinesisVideoClient.config.systemClockOffset,
        });

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
        const configuration = {
            iceServers,
            iceTransportPolicy: formValues.forceTURN ? 'relay' : 'all',
        };
        viewer.peerConnection = new RTCPeerConnection(configuration);

        if (formValues.enableProfileTimeline) {
            viewer.peerConnection.onicegatheringstatechange = (event) => {
                if (viewer.peerConnection.iceGatheringState === 'gathering') {
                    metrics.viewer.iceGathering.startTime = Date.now();
                } else if (viewer.peerConnection.iceGatheringState === 'complete') {
                    metrics.viewer.iceGathering.endTime = Date.now();
                }
            };

            viewer.peerConnection.onconnectionstatechange = (event) => {
                if (viewer.peerConnection.connectionState === 'new' || viewer.peerConnection.connectionState === 'connecting') {
                    metrics.viewer.peerConnection.startTime = Date.now();
                }
                if (viewer.peerConnection.connectionState === 'connected') {
                    metrics.viewer.peerConnection.endTime = Date.now();
                    metrics.viewer.ttffAfterPc.startTime = metrics.viewer.peerConnection.endTime;
                }
            };

            viewer.peerConnection.oniceconnectionstatechange = (event) => {
                if (viewer.peerConnection.iceConnectionState === 'connected') {
                    viewer.peerConnection.getStats().then(stats => {
                        stats.forEach(report => {
                            if (report.type === 'candidate-pair') {
                                activeCandidatePair = report;
                            }
                        });
                    });
                }
            };
        }

        if (formValues.openDataChannel) {
            const dataChannelObj = viewer.peerConnection.createDataChannel('kvsDataChannel');
            viewer.dataChannel = dataChannelObj;
            dataChannelObj.onopen = () => {
                if (formValues.enableProfileTimeline) {
                    dataChannelLatencyCalcMessage.firstMessageFromViewerTs = Date.now().toString();
                    dataChannelObj.send(JSON.stringify(dataChannelLatencyCalcMessage));
                } else {
                    dataChannelObj.send("Opened data channel by viewer");
                }
            };
            // Callback for the data channel created by viewer
            let onRemoteDataMessageViewer = (message) => {

                remoteMessage.append(`${message.data}\n\n`);
                if (formValues.enableProfileTimeline) {

                    // The datachannel first sends a message of the following format with firstMessageFromViewerTs attached,
                    // to which the master responds back with the same message attaching firstMessageFromMasterTs.
                    // In response to this, the viewer sends the same message back with secondMessageFromViewerTs and so on until lastMessageFromViewerTs.
                    // The viewer is responsible for attaching firstMessageFromViewerTs, secondMessageFromViewerTs, lastMessageFromViewerTs. The master is responsible for firstMessageFromMasterTs and secondMessageFromMasterTs.
                    // (Master e2e time: secondMessageFromMasterTs - firstMessageFromMasterTs, Viewer e2e time: secondMessageFromViewerTs - firstMessageFromViewerTs)
                    try {
                        let dataChannelMessage = JSON.parse(message.data);
                        if (dataChannelMessage.hasOwnProperty('firstMessageFromViewerTs')) {
                            if (dataChannelMessage.secondMessageFromViewerTs === '') {
                                dataChannelMessage.secondMessageFromViewerTs = Date.now().toString();
                            } else if (dataChannelMessage.lastMessageFromViewerTs === '') {
                                dataChannelMessage.lastMessageFromViewerTs = Date.now().toString();
                                metrics.master.dataChannel.startTime = Number(dataChannelMessage.firstMessageFromMasterTs);
                                metrics.master.dataChannel.endTime = Number(dataChannelMessage.secondMessageFromMasterTs);

                                metrics.viewer.dataChannel.startTime = Number(dataChannelMessage.firstMessageFromViewerTs);
                                metrics.viewer.dataChannel.endTime = Number(dataChannelMessage.secondMessageFromViewerTs);
                            }
                            dataChannelMessage.content = 'Message from JS viewer';
                            dataChannelObj.send(JSON.stringify(dataChannelMessage));

                        } else if (dataChannelMessage.hasOwnProperty('peerConnectionStartTime')) {
                            metrics.master.peerConnection.startTime = dataChannelMessage.peerConnectionStartTime;
                            metrics.master.peerConnection.endTime = dataChannelMessage.peerConnectionEndTime;

                            metrics.master.ttffAfterPc.startTime = metrics.master.peerConnection.endTime;

                        } else if (dataChannelMessage.hasOwnProperty('signalingStartTime')) {
                            metrics.master.signaling.startTime = dataChannelMessage.signalingStartTime;
                            metrics.master.signaling.endTime = dataChannelMessage.signalingEndTime;

                            if (metrics.viewer.ttff.startTime < metrics.master.signaling.startTime) {
                                metrics.viewer.ttff.startTime = metrics.master.signaling.startTime;
                            }

                            metrics.master.waitTime.startTime = metrics.master.signaling.endTime;
                            metrics.viewer.waitTime.endTime = metrics.master.signaling.startTime;

                            metrics.master.offAnswerTime.startTime = dataChannelMessage.offerReceiptTime;
                            metrics.master.offAnswerTime.endTime = dataChannelMessage.sendAnswerTime;

                            metrics.master.describeChannel.startTime = dataChannelMessage.describeChannelStartTime;
                            metrics.master.describeChannel.endTime = dataChannelMessage.describeChannelEndTime;

                            metrics.master.channelEndpoint.startTime = dataChannelMessage.getSignalingChannelEndpointStartTime;
                            metrics.master.channelEndpoint.endTime = dataChannelMessage.getSignalingChannelEndpointEndTime;

                            metrics.master.iceServerConfig.startTime = dataChannelMessage.getIceServerConfigStartTime;
                            metrics.master.iceServerConfig.endTime = dataChannelMessage.getIceServerConfigEndTime;

                            metrics.master.getToken.startTime = dataChannelMessage.getTokenStartTime;
                            metrics.master.getToken.endTime = dataChannelMessage.getTokenEndTime;

                            metrics.master.createChannel.startTime = dataChannelMessage.createChannelStartTime;
                            metrics.master.createChannel.endTime = dataChannelMessage.createChannelEndTime;

                            metrics.master.connectAsMaster.startTime = dataChannelMessage.connectStartTime;
                            metrics.master.connectAsMaster.endTime = dataChannelMessage.connectEndTime;

                        } else if (dataChannelMessage.hasOwnProperty('candidateGatheringStartTime')) {
                            metrics.master.iceGathering.startTime = dataChannelMessage.candidateGatheringStartTime;
                            metrics.master.iceGathering.endTime = dataChannelMessage.candidateGatheringEndTime;
                        }
                    } catch (e) {
                        console.log("Receiving a non-json message");
                    }
                }
            };
            dataChannelObj.onmessage = onRemoteDataMessageViewer;

            viewer.peerConnection.ondatachannel = event => {
                // Callback for the data channel created by master
                event.channel.onmessage = onRemoteDataMessageViewer;
            };
        }

        // Poll for connection stats if metrics enabled
        if (formValues.enableDQPmetrics) {
            // viewer.peerConnectionStatsInterval = setInterval(() => viewer.peerConnection.getStats().then(onStatsReport), 1000);
            viewer.peerConnectionStatsInterval = setInterval(() => viewer.peerConnection.getStats().then(stats => calcStats(stats, formValues.clientId)), 1000);
        }

        if (formValues.enableProfileTimeline) {
            profilingStartTime = new Date().getTime();
            let headerElement = document.getElementById("timeline-profiling-header");
            viewer.profilingInterval = setInterval(() => {
                let statRunTime = calcDiffTimestamp2Sec(new Date().getTime(), profilingStartTime);
                statRunTime = Number.parseFloat(statRunTime).toFixed(0);
                if (statRunTime <= profilingTestLength) {
                    headerElement.textContent = "Profiling timeline chart available in " + (profilingTestLength - statRunTime);
                }
            }, 1000);
        }

        viewer.signalingClient.on('open', async () => {
            metrics.viewer.connectAsViewer.endTime = Date.now();
            metrics.viewer.signaling.endTime = metrics.viewer.connectAsViewer.endTime;
            metrics.viewer.waitTime.startTime = metrics.viewer.signaling.endTime;
            console.debug('[VIEWER] ConnectAsViewer ended at', new Date(metrics.viewer.connectAsViewer.endTime));
            console.log('[VIEWER] Connected to signaling service');
            console.log('[VIEWER] Time to connect to signaling:', metrics.viewer.connectAsViewer.endTime - metrics.viewer.connectAsViewer.startTime, 'ms');

            metrics.viewer.setupMediaPlayer.startTime = Date.now();
            signalingSetUpTime = metrics.viewer.setupMediaPlayer.startTime - viewerButtonPressed.getTime();
            // Get a stream from the webcam, add it to the peer connection, and display it in the local view.
            // If no video/audio needed, no need to request for the sources.
            // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.
            if (formValues.sendVideo || formValues.sendAudio) {
                try {
                    viewer.localStream = await navigator.mediaDevices.getUserMedia(constraints);
                    viewer.localStream.getTracks().forEach(track => viewer.peerConnection.addTrack(track, viewer.localStream));
                    localView.srcObject = viewer.localStream;
                } catch (e) {
                    console.error(`[VIEWER] Could not find ${Object.keys(constraints).filter(k => constraints[k])} input device.`, e);
                    return;
                }
            }

            metrics.viewer.setupMediaPlayer.endTime = Date.now();
            timeToSetUpViewerMedia = metrics.viewer.setupMediaPlayer.endTime - metrics.viewer.setupMediaPlayer.startTime;

            // Create an SDP offer to send to the master
            console.log('[VIEWER] Creating SDP offer');
            await viewer.peerConnection.setLocalDescription(
                await viewer.peerConnection.createOffer({
                    offerToReceiveAudio: true,
                    offerToReceiveVideo: true,
                }),
            );

            // When trickle ICE is enabled, send the offer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
            if (formValues.useTrickleICE) {
                console.log('[VIEWER] Sending SDP offer');
                console.debug('SDP offer:', viewer.peerConnection.localDescription);
                metrics.viewer.offAnswerTime.startTime = Date.now();
                viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
            }
            console.log('[VIEWER] Generating ICE candidates');
        });

        viewer.signalingClient.on('sdpAnswer', async answer => {
            // Add the SDP answer to the peer connection
            console.log('[VIEWER] Received SDP answer');
            console.debug('SDP answer:', answer);
            metrics.viewer.offAnswerTime.endTime = Date.now();
            await viewer.peerConnection.setRemoteDescription(answer);
        });

        viewer.signalingClient.on('iceCandidate', candidate => {
            // Add the ICE candidate received from the MASTER to the peer connection
            console.log('[VIEWER] Received ICE candidate');
            console.debug('ICE candidate', candidate);
            if (shouldAcceptCandidate(formValues, candidate)) {
                viewer.peerConnection.addIceCandidate(candidate);
            } else {
                console.log('[VIEWER] Not adding candidate from peer.');
            }
        });

        viewer.signalingClient.on('close', () => {
            console.log('[VIEWER] Disconnected from signaling channel');
        });

        viewer.signalingClient.on('error', error => {
            console.error('[VIEWER] Signaling client error:', error);
        });

        // Send any ICE candidates to the other peer
        viewer.peerConnection.addEventListener('icecandidate', ({ candidate }) => {
            if (candidate) {
                console.log('[VIEWER] Generated ICE candidate');
                console.debug('ICE candidate:', candidate);

                // When trickle ICE is enabled, send the ICE candidates as they are generated.
                if (formValues.useTrickleICE) {
                    if (shouldSendIceCandidate(formValues, candidate)) {
                        console.log('[VIEWER] Sending ICE candidate');
                        viewer.signalingClient.sendIceCandidate(candidate);
                    } else {
                        console.log('[VIEWER] Not sending ICE candidate');
                    }
                }
            } else {
                console.log('[VIEWER] All ICE candidates have been generated');

                // When trickle ICE is disabled, send the offer now that all the ICE candidates have ben generated.
                if (!formValues.useTrickleICE) {
                    console.log('[VIEWER] Sending SDP offer');
                    console.debug('SDP offer:', viewer.peerConnection.localDescription);
                    viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
                }
            }
        });

        viewer.peerConnection.addEventListener('connectionstatechange', async event => {
            printPeerConnectionStateInfo(event, '[VIEWER]');
        });

        // As remote tracks are received, add them to the remote view
        viewer.peerConnection.addEventListener('track', event => {
            console.log('[VIEWER] Received remote track with id:', event?.streams[0]?.id ?? '[Error retrieving track ID]');
            if (remoteView.srcObject) {
                return;
            }
            viewer.remoteStream = event.streams[0];
            remoteView.srcObject = viewer.remoteStream;

            //measure the time to first track
            if (formValues.enableDQPmetrics && initialDate === 0) {
                initialDate = new Date();
            }
        });

        console.log('[VIEWER] Starting viewer connection');
        viewer.signalingClient.open();
    } catch (e) {
        console.error('[VIEWER] Encountered error starting:', e);
    }
}

function stopViewer() {
    try {
        console.log('[VIEWER] Stopping viewer connection');

        if (viewer.signalingClient) {
            viewer.signalingClient.close();
            viewer.signalingClient = null;
        }

        if (viewer.peerConnection) {
            viewer.peerConnection.close();
            viewer.peerConnection = null;
        }

        if (viewer.localStream) {
            viewer.localStream.getTracks().forEach(track => track.stop());
            viewer.localStream = null;
        }

        if (viewer.remoteStream) {
            viewer.remoteStream.getTracks().forEach(track => track.stop());
            viewer.remoteStream = null;
        }

        if (viewer.peerConnectionStatsInterval) {
            clearInterval(viewer.peerConnectionStatsInterval);
            viewer.peerConnectionStatsInterval = null;
        }

        if (viewer.localView) {
            viewer.localView.srcObject = null;
        }

        if (viewer.remoteView) {
            viewer.remoteView.srcObject = null;
        }

        if (viewer.dataChannel) {
            viewer.dataChannel = null;
        }

        if (getFormValues().enableDQPmetrics) {
            chart.destroy();
            statStartTime = 0;
        }

        if (getFormValues().enableProfileTimeline) {
            let container = document.getElementById('timeline-chart');
            let headerElement = document.getElementById("timeline-profiling-header");
            container.innerHTML = "";
            container.style.height = "0px";
            if (viewer.profilingInterval) {
                clearInterval(viewer.profilingInterval);
            }
            headerElement.textContent = "";
        }

        viewer = {};

    } catch (e) {
        console.error('[VIEWER] Encountered error stopping', e);
    }
}

function sendViewerMessage(message) {
    if (viewer.dataChannel) {
        try {
            viewer.dataChannel.send(message);
            console.log('[VIEWER] Sent', message, 'to MASTER!');
            return true;
        } catch (e) {
            console.error('[VIEWER] Send DataChannel:', e.toString());
            return false;
        }
    } else {
        console.warn('[VIEWER] No DataChannel exists!');
        return false;
    }
}

function profilingCalculations() {
    let headerElement = document.getElementById("timeline-profiling-header");
    headerElement.textContent = "Profiling Timeline chart";
    google.charts.load('current', {packages:['timeline']});
    google.charts.setOnLoadCallback(drawChart);
    clearInterval(viewer.profilingInterval);
}

// Functions below support DQP test and metrics

// function to calculate difference between two epoch timestamps and return seconds with large being the most recent and small being the oldest.
function calcDiffTimestamp2Sec(large, small) {
    return ((large - small) / 1000).toFixed(2);
}

function calcStats(stats, clientId) {
    let rttCurrent = 0;

    let videoBitrate = 0;
    let videoFramerate = 0;
    let videoHeight = 0;
    let videoWidth = 0;
    let videojitter = 0;
    let videoDecodedFrameCount = 0;
    let videoDroppedFrameCount = 0;
    let curDroppedFrames = 0;
    let audioBitrate = 0;
    let audiojitter = 0;
    let audioSamplesReceived = 0;

    let activeCandidatePair = null;
    let remoteCandidate = null;
    let localCandidate = null;
    let remoteCandidateConnectionString = '';
    let localCandidateConnectionString = '';
    let htmlString = '';

    //Loop through each report and find the active pair.
    stats.forEach(report => {
        if (report.type === 'transport') {
            activeCandidatePair = stats.get(report.selectedCandidatePairId);
        }
    });

    // Firefox fix.
    if (!activeCandidatePair) {
        stats.forEach(report => {
            if (report.type === 'candidate-pair' && report.selected) {
                activeCandidatePair = report;
            }
        });
    }

    // Get the remote candidate connected
    if (activeCandidatePair && activeCandidatePair.remoteCandidateId && activeCandidatePair.localCandidateId) {
        remoteCandidate = stats.get(activeCandidatePair.remoteCandidateId);
        localCandidate = stats.get(activeCandidatePair.localCandidateId);
    }

    // Capture the IP and port of the remote candidate
    if (remoteCandidate) {
        remoteCandidateConnectionString = '[' + remoteCandidate.candidateType + '] '
        if (remoteCandidate.address && remoteCandidate.port) {
            remoteCandidateConnectionString = remoteCandidateConnectionString + remoteCandidate.address + ':' + remoteCandidate.port + ' - ' + remoteCandidate.protocol;
        } else if (remoteCandidate.ip && remoteCandidate.port) {
            remoteCandidateConnectionString = remoteCandidateConnectionString + remoteCandidate.ip + ':' + remoteCandidate.port + ' - ' + remoteCandidate.protocol;
        } else if (remoteCandidate.ipAddress && remoteCandidate.portNumber) {
            remoteCandidateConnectionString = remoteCandidateConnectionString + remoteCandidate.ipAddress + ':' + remoteCandidate.portNumber + ' - ' + remoteCandidate.protocol;
        }
    }

    // Capture the IP and port of the local candidate
    if (localCandidate) {
        localCandidateConnectionString = '[' + localCandidate.candidateType + '] '
        if (localCandidate.address && localCandidate.port) {
            localCandidateConnectionString = localCandidateConnectionString + localCandidate.address + ':' + localCandidate.port + ' - ' + localCandidate.protocol;
        } else if (localCandidate.ip && localCandidate.port) {
            localCandidateConnectionString = localCandidateConnectionString + localCandidate.ip + ':' + localCandidate.port + ' - ' + localCandidate.protocol;
        } else if (localCandidate.ipAddress && localCandidate.portNumber) {
            localCandidateConnectionString = localCandidateConnectionString + localCandidate.ipAddress + ':' + localCandidate.portNumber + ' - ' + localCandidate.protocol;
        }
    }

    if (activeCandidatePair) {
        // Get the current RTT the pair.
        rttCurrent = activeCandidatePair.currentRoundTripTime;

        //Get the video stats.
        stats.forEach(report => {
            if (report.type === 'inbound-rtp' && report.mediaType === 'video') {
                videoFramerate = report.framesPerSecond;
                videoHeight = report.frameHeight;
                videoWidth = report.frameWidth;
                videojitter = report.jitter;
                videoDecodedFrameCount = report.framesDecoded;
                videoDroppedFrameCount = report.framesDropped;

                const bytes = report.bytesReceived;
                if (vTimeStampPrev) {
                    videoBitrate = (8 * (bytes - vBytesPrev)) / (report.timestamp - vTimeStampPrev);
                    videoBitrate = Math.floor(videoBitrate);
                    curDroppedFrames = videoDroppedFrameCount - vFDroppedPrev;
                }
                vBytesPrev = bytes;
                vTimeStampPrev = report.timestamp;
                vFDroppedPrev = videoDroppedFrameCount;
            }
        });

        //Get the audio stats.
        stats.forEach(report => {
            if (report.type === 'inbound-rtp' && report.mediaType === 'audio') {
                audiojitter = report.jitter;
                audioSamplesReceived = report.totalSamplesReceived;

                const bytes = report.bytesReceived;
                if (aTimeStampPrev) {
                    audioBitrate = (8 * (bytes - aBytesPrev)) / (report.timestamp - aTimeStampPrev);
                    audioBitrate = Math.floor(audioBitrate);
                }
                aBytesPrev = bytes;
                aTimeStampPrev = report.timestamp;
            }
        });

        // Only start test and display metrics once something has been decoded
        if (videoDecodedFrameCount > 0 || audioSamplesReceived > 0) {
            const currentDate = Date.now();
            const currentTime = new Date(currentDate).getTime();

            //timestamp start of decoded frames
            if (statStartTime === 0) {
                statStartTime = currentTime;
                statStartDate = currentDate;
                console.log('[DQP TEST] Measuring stream stats from Master.');
            }

            let statRunTime = calcDiffTimestamp2Sec(currentTime, statStartTime);
            statRunTime = Number.parseFloat(statRunTime).toFixed(0);

            if (typeof videoFramerate === 'undefined' || isNaN(videoFramerate)) {
                // force to zero if there are gaps in the stream
                videoFramerate = 0;
            }

            // Calculate dropped frame percentage
            let curDropPercent = (curDroppedFrames / (curDroppedFrames + videoFramerate)) * 100;

            if (typeof curDropPercent === 'undefined' || isNaN(curDropPercent)) {
                // force to 100% if there are gaps in the stream
                curDropPercent = 100;
            }

            //Calculate the averages
            rttSum += rttCurrent;
            framerateSum += videoFramerate;
            framedropPerSum += curDropPercent;
            vjitterSum += videojitter;
            vBitrateSum += videoBitrate;
            aBitrateSum += audioBitrate;
            ajitterSum += audiojitter;

            count++;

            const avgRtt = rttSum / count;
            const avgFramerate = framerateSum / count;
            const avgDropPercent = framedropPerSum / count;
            const avgVbitrate = vBitrateSum / count;
            const avgVjitter = vjitterSum / count;
            const avgAbitrate = aBitrateSum / count;
            const avgAjitter = ajitterSum / count;

            // Display test progress and results
            if (statRunTime <= DQPtestLength) {
                // prettier-ignore
                htmlString =
                    '<table><tr><strong>DQP TEST (2min) - <FONT COLOR=RED>RESULTS READY IN: ' + (DQPtestLength - statRunTime) + ' sec</FONT></strong></tr>' +
                    '<tr><td>Client ID: </td><td>' + clientId + '</td></tr>' +
                    '<tr><td>Time from viewer button click to signaling setup: </td><td>' + signalingSetUpTime + ' ms</td></tr>' +
                    '<tr><td>Time to set up viewer media view: </td><td>' + timeToSetUpViewerMedia + ' ms</td></tr>' +
                    '<tr><td>Time from offer to first decoded frame: </td><td>' + timeToFirstFrameFromOffer + ' ms</td></tr>' +
                    '<tr><td>Time from viewer button click to first decoded frame: </td><td>' + timeToFirstFrameFromViewerStart + ' ms</td></tr>';
                testAvgRTT = avgRtt;
                testAvgFPS = avgFramerate;
                testAvgDropPer = avgDropPercent;
                testAvgVbitrate = avgVbitrate;
                testAvgVjitter = avgVjitter;
                testAvgAbitrate = avgAbitrate;
                testAvgAjitter = avgAjitter;

                //push data to chart while avg test is running
                decodedFPSArray.push(videoFramerate);
                droppedFramePerArray.push(curDropPercent);
                videoBitRateArray.push(videoBitrate);
                audioRateArray.push(audioBitrate);
                timeArray.push(statRunTime);
                chart.update();
            } else {
                // prettier-ignore
                htmlString =
                    '<table><tr><th>DQP TEST COMPLETE - RESULTS:</th></tr>' +
                    '<tr><td>Test Run Time:</td><td>' + DQPtestLength + ' sec</td></tr>' +
                    '<tr><td>Client ID: </td><td>' + clientId + '</td></tr>' +
                    '<tr><td>Selected remote candidate: </td><td>' + remoteCandidateConnectionString + '</td></tr>' +
                    '<tr><td>Selected local candidate: </td><td>' + localCandidateConnectionString + '</td></tr>' +
                    '<tr><td>Time from viewer button click to signaling setup: </td><td>' + signalingSetUpTime + ' ms</td></tr>' +
                    '<tr><td>Time set up viewer media view: </td><td>' + timeToSetUpViewerMedia + ' ms</td></tr>' +
                    '<tr><td>Time from offer to first decoded frame: </td><td>' + timeToFirstFrameFromOffer + ' ms</td></tr>' +
                    '<tr><td>Time from viewer button click to first decoded frame (without viewer media screen set up): </td><td>' + (timeToFirstFrameFromViewerStart - timeToSetUpViewerMedia) + ' ms</td></tr>' +
                    '<tr><td>Avg RTT: </td><td>' + testAvgRTT.toFixed(3) + ' sec</td></tr>' +
                    '<tr><td>Video Resolution: </td><td>' + videoWidth + ' x ' + videoHeight + '</td></tr>' +
                    '<tr><td>Avg Video bitrate: </td><td>' + testAvgVbitrate.toFixed(1) + ' kbps</td></tr>' +
                    '<tr><td>Avg Video Frame Rate: </td><td>' + testAvgFPS.toFixed(2) + ' FPS</td></tr>' +
                    '<tr><td>Avg Frame Drop : </td><td>' + testAvgDropPer.toFixed(2) + ' %</td></tr>' +
                    '<tr><td>Avg Video Jitter: </td><td>' + testAvgVjitter.toFixed(3) + ' sec</td></tr>' +
                    '<tr><td>Avg Audio bitrate: </td><td>' + testAvgAbitrate.toFixed(1) + ' kbps</td></tr>' +
                    '<tr><td>Avg Audio Jitter: </td><td>' + testAvgAjitter.toFixed(3) + ' sec</td></tr></table>';
            }
            // Update the page
            $('#dqp-test')[0].innerHTML = htmlString;

            // Display ongoing live stats.
            // prettier-ignore
            htmlString =
                '<table><tr><td>VIEWER Start: </td><td>' + new Date(viewerButtonPressed).toISOString() + '</td></tr>' +
                '<tr><td>TRACK Start: </td><td>' + new Date(initialDate).toISOString() + '</td></tr>' +
                '<tr><td>DECODED Start: </td><td>' + new Date(statStartDate).toISOString() + '</td></tr>' +
                '<tr><td>Time Connected: </td><td>' + statRunTime + ' sec</td></tr>' +
                '<tr><td>Selected remote candidate: </td><td>' + remoteCandidateConnectionString + '</td></tr>' +
                '<tr><td>Selected local candidate: </td><td>' + localCandidateConnectionString + '</td></tr>' +
                '<tr><td>RTT: </td><td>' + rttCurrent.toFixed(3) + ' sec</td></tr>' +
                '<tr><td><u>VIDEO: </u></td></tr>' +
                '<tr><td></td><td>Resolution: </td><td>' + videoWidth + ' x ' + videoHeight + '</td></tr>' +
                '<tr><td></td><td>Bitrate: </td><td>' + videoBitrate + ' kbps</td></tr>' +
                '<tr><td></td><td>Frame Rate: </td><td>' + videoFramerate + ' FPS</td></tr>' +
                '<tr><td></td><td>Frames Dropped: </td><td>' + curDropPercent.toFixed(2) + ' %</td></tr>' +
                '<tr><td></td><td>Jitter: </td><td>' + videojitter.toFixed(3) + ' sec</td></tr>' +
                '<tr><td><u>AUDIO: </u></td></tr>' +
                '<tr><td></td><td>Bitrate : </td><td>' + audioBitrate + ' kbps</td></tr>' +
                '<tr><td></td><td>Samples Received: </td><td>' + audioSamplesReceived + '</td></tr>' +
                '<tr><td></td><td>Jitter: </td><td>' + audiojitter.toFixed(3) + ' sec</td></tr></table>';
            // Update the page
            $('#webrtc-live-stats')[0].innerHTML = htmlString;
        } else {
            htmlString = '<table><tr><strong><FONT COLOR=RED>WAITING FOR STREAM STATS...</FONT></strong></tr></table>';
            //Update the page
            $('#dqp-test')[0].innerHTML = htmlString;
            console.log('[DQP TEST] Waiting for stream stats...');
        }
    }
}

function getTooltipContent(explanation, duration) {
    return `<div style="padding:10px;">
        <p><strong>Duration: </strong>${duration} ms</p>
        <p><strong>Explanation: </strong>${explanation}</p>
    </div>`
}

function getCalculatedEpoch(time, diffInMillis, minTime) {
    return time > minTime ? new Date(time - diffInMillis) : new Date(minTime - diffInMillis);
}

function drawChart() {
    const viewerOrder = ['signaling', 'describeChannel', 'describeMediaStorageConfiguration', 'channelEndpoint', 'iceServerConfig', 'signConnectAsViewer', 'connectAsViewer', 'setupMediaPlayer', 'waitTime',
                    'offAnswerTime', 'iceGathering', 'peerConnection', 'dataChannel', 'ttffAfterPc', 'ttff'];
    const masterOrder = ['signaling', 'describeChannel', 'channelEndpoint', 'iceServerConfig', 'getToken', 'createChannel', 'connectAsMaster', 'waitTime',
                    'offAnswerTime', 'iceGathering', 'peerConnection', 'dataChannel', 'ttffAfterPc'];
    const container = document.getElementById('timeline-chart');
    const rowHeight = 45;
    const chart = new google.visualization.Timeline(container);
    const dataTable = new google.visualization.DataTable();
    let containerHeight = rowHeight;
    let minTime = Math.min(metrics.master.signaling.startTime, metrics.viewer.signaling.startTime);
    let diffInMillis = minTime - new Date(0).getTime(); // to start the x-axis timescale at 0
    let colors = [];

    dataTable.addColumn({ type: 'string', id: 'Term' });
    dataTable.addColumn({ type: 'string', id: 'Bar label' });
    dataTable.addColumn({ type: 'string', role: 'tooltip' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    masterOrder.forEach((key) => {
        if (metrics.master[key]) {
            let startTime = getCalculatedEpoch(metrics.master[key].startTime, diffInMillis, minTime);
            let endTime = getCalculatedEpoch(metrics.master[key].endTime, diffInMillis, minTime);
            let duration = endTime - startTime;

            if (duration > 0) {
                dataTable.addRow([ metrics.master[key].name, null, getTooltipContent(metrics.master[key].tooltip, duration), startTime, endTime ]);
                colors.push(metrics.master[key].color);
                containerHeight += rowHeight;
            }
        }
    });

    viewerOrder.forEach((key) => {
        if (metrics.viewer[key]) {
            let startTime = getCalculatedEpoch(metrics.viewer[key].startTime, diffInMillis, minTime);
            let endTime = getCalculatedEpoch(metrics.viewer[key].endTime, diffInMillis, minTime);
            let duration = endTime - startTime;

            if (duration > 0) {
                dataTable.addRow([ metrics.viewer[key].name, null, getTooltipContent(metrics.viewer[key].tooltip, duration), startTime, endTime ]);
                colors.push(metrics.viewer[key].color);
                containerHeight += rowHeight;
            }
        }
    });

    options = {
        tooltip: {
            isHtml: true
        },
        timeline: {
            groupByRowLabel: true,
            minValue: new Date(0)
        },
        colors: colors
    }
    container.style.height = containerHeight.toString() + 'px';
    chart.draw(dataTable, options);
}
