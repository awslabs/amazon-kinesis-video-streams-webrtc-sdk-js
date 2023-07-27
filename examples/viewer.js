/**
 * This file demonstrates the process of starting WebRTC streaming using a KVS Signaling Channel.
 */
const viewer = {};

//globals for DQP metrics and test
const DQPtestLength = 120; //test time in seconds
let viewerButtonPressed = new Date();
let initialDate = 0;
let chart = {};
let vTimeStampPrev = 0;
let aTimeStampPrev = 0;
let vBytesPrev = 0;
let vFDroppedPrev = 0;
let aBytesPrev = 0;
let connectionTime = 0;
let statStartTime = 0;
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

async function startViewer(localView, remoteView, formValues, onStatsReport, onRemoteDataMessage) {
    try {
        console.log('[VIEWER] Client id is:', formValues.clientId);

        viewer.localView = localView;
        viewer.remoteView = remoteView;

        if (formValues.enableDQPmetrics) {
            viewerButtonPressed = new Date();
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
        const describeSignalingChannelResponse = await kinesisVideoClient
            .describeSignalingChannel({
                ChannelName: formValues.channelName,
            })
            .promise();
        const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
        console.log('[VIEWER] Channel ARN:', channelARN);

        // Get signaling channel endpoints
        const getSignalingChannelEndpointResponse = await kinesisVideoClient
            .getSignalingChannelEndpoint({
                ChannelARN: channelARN,
                SingleMasterChannelEndpointConfiguration: {
                    Protocols: ['WSS', 'HTTPS'],
                    Role: KVSWebRTC.Role.VIEWER,
                },
            })
            .promise();
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
        if (formValues.openDataChannel) {
            viewer.dataChannel = viewer.peerConnection.createDataChannel('kvsDataChannel');
            // Callback for the data channel created by viewer
            viewer.dataChannel.onmessage = onRemoteDataMessage;
            viewer.peerConnection.ondatachannel = event => {
                // Callback for the data channel created by master
                event.channel.onmessage = onRemoteDataMessage;
            };
        }

        // Poll for connection stats if metrics enabled
        if (formValues.enableDQPmetrics) {
            // viewer.peerConnectionStatsInterval = setInterval(() => viewer.peerConnection.getStats().then(onStatsReport), 1000);
            viewer.peerConnectionStatsInterval = setInterval(() => viewer.peerConnection.getStats().then(stats => calcStats(stats, formValues.clientId)), 1000);
        }

        viewer.signalingClient.on('open', async () => {
            console.log('[VIEWER] Connected to signaling service');

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
                viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
            }
            console.log('[VIEWER] Generating ICE candidates');
        });

        viewer.signalingClient.on('sdpAnswer', async answer => {
            // Add the SDP answer to the peer connection
            console.log('[VIEWER] Received SDP answer');
            console.debug('SDP answer:', answer);
            await viewer.peerConnection.setRemoteDescription(answer);
        });

        viewer.signalingClient.on('iceCandidate', candidate => {
            // Add the ICE candidate received from the MASTER to the peer connection
            console.log('[VIEWER] Received ICE candidate');
            console.debug('ICE candidate', candidate);
            viewer.peerConnection.addIceCandidate(candidate);
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
                    console.log('[VIEWER] Sending ICE candidate');
                    viewer.signalingClient.sendIceCandidate(candidate);
                }
            } else {
                console.log('[VIEWER] All ICE candidates have been generated');

                // When trickle ICE is disabled, send the offer now that all the ICE candidates have ben generated.
                if (!formValues.useTrickleICE) {
                    console.log('[VIEWER] Sending SDP offer');
                    console.debug('SDP offer:', peerConnection.localDescription);
                    viewer.signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
                }
            }
        });

        viewer.peerConnection.addEventListener('connectionstatechange', async event => {
            printPeerConnectionStateInfo(event, '[VIEWER]');
        });

        // As remote tracks are received, add them to the remote view
        viewer.peerConnection.addEventListener('track', event => {
            console.log('[VIEWER] Received remote track');
            if (remoteView.srcObject) {
                return;
            }
            viewer.remoteStream = event.streams[0];
            remoteView.srcObject = viewer.remoteStream;

            //measure the time to first track
            if (formValues.enableDQPmetrics && connectionTime === 0) {
                initialDate = new Date();
                connectionTime = calcDiffTimestamp2Sec(initialDate.getTime(), viewerButtonPressed.getTime());
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
    let connectionString = '';
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
    if (activeCandidatePair && activeCandidatePair.remoteCandidateId) {
        remoteCandidate = stats.get(activeCandidatePair.remoteCandidateId);
    }

    // Capture the IP and port of the remote candidate
    if (remoteCandidate) {
        if (remoteCandidate.address && remoteCandidate.port) {
            connectionString = remoteCandidate.address + ' : ' + remoteCandidate.port + ' - ' + remoteCandidate.protocol;
        } else if (remoteCandidate.ip && remoteCandidate.port) {
            connectionString = remoteCandidate.ip + ' : ' + remoteCandidate.port + ' - ' + remoteCandidate.protocol;
        } else if (remoteCandidate.ipAddress && remoteCandidate.portNumber) {
            connectionString = remoteCandidate.ipAddress + ' : ' + remoteCandidate.portNumber + ' - ' + remoteCandidate.protocol;
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
            const currentDate = new Date();
            const currentTime = currentDate.getTime();

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
                    '<tr><td>Time to P2P connection: </td><td>' + connectionTime + ' sec</td></tr>' +
                    '<tr><td>Time to decoded stream(sec): </td><td>' + calcDiffTimestamp2Sec(statStartTime, viewerButtonPressed.getTime()) + ' sec</td></tr></table>';
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
                    '<tr><td>Time to P2P connection: </td><td>' + connectionTime + ' sec</td></tr>' +
                    '<tr><td>Time to decoded frames: </td><td>' + calcDiffTimestamp2Sec(statStartTime, viewerButtonPressed.getTime()) + ' sec</td></tr>' +
                    '<tr><td>Peer Connection: </td><td>' + connectionString + '</td></tr>' +
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
                '<table><tr><td>VIEWER Start: </td><td>' + viewerButtonPressed.toISOString() + '</td></tr>' +
                '<tr><td>TRACK Start: </td><td>' + initialDate.toISOString() + '</td></tr>' +
                '<tr><td>DECODED Start: </td><td>' + statStartDate.toISOString() + '</td></tr>' +
                '<tr><td>Time Connected: </td><td>' + statRunTime + ' sec</td></tr>' +
                '<tr><td>Peer Connection: </td><td>' + connectionString + '</td></tr>' +
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
