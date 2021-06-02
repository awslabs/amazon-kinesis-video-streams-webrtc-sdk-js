import { Role } from 'amazon-kinesis-video-streams-webrtc'
import WebRtcClient from './webRtcClient'

export default class Master {
  constructor(setState, onStatsReport, onRemoteDataMessage) {
    this.setState = setState
    this.onStatsReport = onStatsReport
    this.onRemoteDataMessage = onRemoteDataMessage
    this.signalingClient = null
    this.peerConnectionByClientId = {}
    this.dataChannelByClientId = {}
    this.localStream = null
    this.remoteStreams = []
    this.peerConnectionStatsInterval = null
    this.remoteViewSrcObject = null
    this.peerConnection = null
    this.dataChannel = null
  }

  setLocalViewSrcObject(srcObject) {
    this.localViewSrcObject = srcObject
    this.setState({
      localViewSrcObject: srcObject
    })
  }

  setRemoteViewSrcObject(srcObject) {
    this.remoteViewSrcObject = srcObject
    this.setState({
      remoteViewSrcObject: srcObject
    })
  }

  async start(credentials, params) {

    const {
      region,
      endpoint,
      channelName,
      clientId,
      sendAudio,
      sendVideo,
      openDataChannel,
      widescreen,
      forceTURN,
      natTraversalDisabled,
      useTrickleICE,
    } = params


    this.webRtcClient = new WebRtcClient(
      Role.MASTER,
      credentials,
      region,
      endpoint,
      channelName,
      clientId,
      natTraversalDisabled,
      forceTURN,
    )

    const channelARN = await this.webRtcClient.getChannelARN()
    console.log('[MASTER] Channel ARN: ', channelARN)

    const endpointsByProtocol = await this.webRtcClient.getEndpointsByProtocol()
    console.log('[MASTER] Endpoints: ', endpointsByProtocol)

    const iceServers = await this.webRtcClient.getIceServers()
    console.log('[MASTER] ICE servers: ', iceServers)

    this.signalingClient = await this.webRtcClient.getSignalingClient()

    const configuration = {
      iceServers,
      iceTransportPolicy: forceTURN ? 'relay' : 'all',
    };

    const resolution = widescreen ? { width: { ideal: 1280 }, height: { ideal: 720 } } : { width: { ideal: 640 }, height: { ideal: 480 } };
    const constraints = {
      video: sendVideo ? resolution : false,
      audio: sendAudio,
    };

    // Get a stream from the webcam and display it in the local view.
    // If no video/audio needed, no need to request for the sources.
    // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.
    if (sendVideo || sendAudio) {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.setLocalViewSrcObject(this.localStream)
        } catch (e) {
            console.error('[MASTER] Could not find webcam');
        }
    }

    this.signalingClient.on('open', async () => {
        console.log('[MASTER] Connected to signaling service');
    });

    this.signalingClient.on('sdpOffer', async (offer, remoteClientId) => {
        console.log('[MASTER] Received SDP offer from client: ' + remoteClientId);

        // Create a new peer connection using the offer from the given client
        const peerConnection = new RTCPeerConnection(configuration);
        this.peerConnectionByClientId[remoteClientId] = peerConnection;

        if (openDataChannel) {
            this.dataChannelByClientId[remoteClientId] = peerConnection.createDataChannel('kvsDataChannel');
            peerConnection.ondatachannel = event => {
                event.channel.onmessage = this.onRemoteDataMessage;
            };
        }

        // Poll for connection stats
        if (!this.peerConnectionStatsInterval) {
            this.peerConnectionStatsInterval = setInterval(() => peerConnection.getStats().then(this.onStatsReport), 1000);
        }

        // Send any ICE candidates to the other peer
        peerConnection.addEventListener('icecandidate', ({ candidate }) => {
            if (candidate) {
                console.log('[MASTER] Generated ICE candidate for client: ' + remoteClientId);

                // When trickle ICE is enabled, send the ICE candidates as they are generated.
                if (useTrickleICE) {
                    console.log('[MASTER] Sending ICE candidate to client: ' + remoteClientId);
                    this.signalingClient.sendIceCandidate(candidate, remoteClientId);
                }
            } else {
                console.log('[MASTER] All ICE candidates have been generated for client: ' + remoteClientId);

                // When trickle ICE is disabled, send the answer now that all the ICE candidates have ben generated.
                if (!useTrickleICE) {
                    console.log('[MASTER] Sending SDP answer to client: ' + remoteClientId);
                    this.signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId);
                }
            }
        });

        // As remote tracks are received, add them to the remote view
        peerConnection.addEventListener('track', event => {
            console.log('[MASTER] Received remote track from client: ' + remoteClientId);
            if (this.remoteViewSrcObject) {
                return
            }

            this.setRemoteViewSrcObject(event.streams[0])
        });

        // If there's no video/audio, master.localStream will be null. So, we should skip adding the tracks from it.
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => peerConnection.addTrack(track, this.localStream));
        }
        await peerConnection.setRemoteDescription(offer);

        // Create an SDP answer to send back to the client
        console.log('[MASTER] Creating SDP answer for client: ' + remoteClientId);
        await peerConnection.setLocalDescription(
            await peerConnection.createAnswer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            }),
        );

        // When trickle ICE is enabled, send the answer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
        if (useTrickleICE) {
            console.log('[MASTER] Sending SDP answer to client: ' + remoteClientId);
            this.signalingClient.sendSdpAnswer(peerConnection.localDescription, remoteClientId);
        }
        console.log('[MASTER] Generating ICE candidates for client: ' + remoteClientId);
    });

    this.signalingClient.on('iceCandidate', async (candidate, remoteClientId) => {
        console.log('[MASTER] Received ICE candidate from client: ' + remoteClientId);

        // Add the ICE candidate received from the client to the peer connection
        const peerConnection = this.peerConnectionByClientId[remoteClientId];
        peerConnection.addIceCandidate(candidate);
    });

    this.signalingClient.on('close', () => {
        console.log('[MASTER] Disconnected from signaling channel');
    });

    this.signalingClient.on('error', () => {
        console.error('[MASTER] Signaling client error');
    });

    console.log('[MASTER] Starting master connection');
    this.signalingClient.open();
  }

  stop(){
    console.log('[MASTER] Stopping master connection');
    if (this.signalingClient) {
        this.signalingClient.close();
        this.signalingClient = null;
    }

    Object.keys(this.peerConnectionByClientId).forEach(clientId => {
        this.peerConnectionByClientId[clientId].close();
    });
    this.peerConnectionByClientId = [];

    if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop());
        this.localStream = null;
    }

    this.remoteStreams.forEach(remoteStream => remoteStream.getTracks().forEach(track => track.stop()));
    this.remoteStreams = [];

    if (this.peerConnectionStatsInterval) {
        clearInterval(this.peerConnectionStatsInterval);
        this.peerConnectionStatsInterval = null;
    }

    if (this.localViewSrcObject) {
        this.setLocalViewSrcObject(null)
    }

    if (this.remoteViewSrcObject) {
        this.setRemoteViewSrcObject(null)
    }

    if (this.dataChannelByClientId) {
        this.dataChannelByClientId = {};
    }
  }

  sendMessage(message){
    Object.keys(this.dataChannelByClientId).forEach(clientId => {
        try {
            this.dataChannelByClientId[clientId].send(message);
        } catch (e) {
            console.error('[MASTER] Send DataChannel: ', e.toString());
        }
    });
  }
}
