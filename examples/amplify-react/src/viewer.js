import { Role } from 'amazon-kinesis-video-streams-webrtc'
import WebRtcClient from './webRtcClient'

export default class Viewer {
  constructor(setState, onStatsReport, onRemoteDataMessage) {
    this.setState = setState
    this.onStatsReport = onStatsReport
    this.onRemoteDataMessage = onRemoteDataMessage
    this.signalingClient = null
    this.peerConnection = null
    this.dataChannel = null
    this.peerConnectionStatsInterval = null
    this.localStream = null
    this.remoteStream = null
    this.localViewSrcObject = null
    this.remoteViewSrcObject = null
  }



  setLocalViewSrcObject(srcObject) {
    console.log(`setting local view srcObject: ${srcObject}`)
    this.localViewSrcObject = srcObject
    this.setState({
      localViewSrcObject: srcObject
    })
  }

  setRemoteViewSrcObject(srcObject) {
    console.log(`setting remote view srcObject: ${srcObject}`)
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
      Role.VIEWER,
      credentials,
      region,
      endpoint,
      channelName,
      clientId,
      natTraversalDisabled,
      forceTURN,
    )

    const channelARN = await this.webRtcClient.getChannelARN()
    console.log('[VIEWER] Channel ARN: ', channelARN)

    const endpointsByProtocol = await this.webRtcClient.getEndpointsByProtocol()
    console.log('[VIEWER] Endpoints: ', endpointsByProtocol)

    const iceServers = await this.webRtcClient.getIceServers()
    console.log('[VIEWER] ICE servers: ', iceServers)

    this.signalingClient = await this.webRtcClient.getSignalingClient()

    const resolution = widescreen ? {
      width: {
        ideal: 1280
      },
      height: {
        ideal: 720
      }
    } : {
      width: {
        ideal: 640
      },
      height: {
        ideal: 480
      }
    }

    const constraints = {
      video: sendVideo ? resolution : false,
      audio: sendAudio,
    }

    const configuration = {
      iceServers,
      iceTransportPolicy: forceTURN ? 'relay' : 'all',
    };

    this.peerConnection = new RTCPeerConnection(configuration);
    if (openDataChannel) {
      this.dataChannel = this.peerConnection.createDataChannel('kvsDataChannel');
      this.peerConnection.ondatachannel = event => {
        event.channel.onmessage = this.onRemoteDataMessage;
      };
    }

    // Poll for connection stats
    this.peerConnectionStatsInterval = setInterval(() => this.peerConnection.getStats().then(this.onStatsReport), 1000);

    this.signalingClient.on('open', async () => {
      console.log('[VIEWER] Connected to signaling service');

      // Get a stream from the webcam, add it to the peer connection, and display it in the local view.
      // If no video/audio needed, no need to request for the sources.
      // Otherwise, the browser will throw an error saying that either video or audio has to be enabled.
      if (sendVideo || sendAudio) {
        try {
          this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
          this.localStream.getTracks().forEach(track => this.peerConnection.addTrack(track, this.localStream));
          this.setLocalViewSrcObject(this.localStream)
        } catch (e) {
          console.error('[VIEWER] Could not find webcam');
          return;
        }
      }

      // Create an SDP offer to send to the master
      console.log('[VIEWER] Creating SDP offer');
      await this.peerConnection.setLocalDescription(
        await this.peerConnection.createOffer({
          offerToReceiveAudio: true,
          offerToReceiveVideo: true,
        }),
      );

      // When trickle ICE is enabled, send the offer now and then send ICE candidates as they are generated. Otherwise wait on the ICE candidates.
      if (useTrickleICE) {
        console.log('[VIEWER] Sending SDP offer');
        this.signalingClient.sendSdpOffer(this.peerConnection.localDescription);
      }
      console.log('[VIEWER] Generating ICE candidates');
    });

    this.signalingClient.on('sdpAnswer', async answer => {
      // Add the SDP answer to the peer connection
      console.log('[VIEWER] Received SDP answer');
      await this.peerConnection.setRemoteDescription(answer);
    });

    this.signalingClient.on('iceCandidate', candidate => {
      // Add the ICE candidate received from the MASTER to the peer connection
      console.log('[VIEWER] Received ICE candidate');
      this.peerConnection.addIceCandidate(candidate);
    });

    this.signalingClient.on('close', () => {
      console.log('[VIEWER] Disconnected from signaling channel');
    });

    this.signalingClient.on('error', error => {
      console.error('[VIEWER] Signaling client error: ', error);
    });

    // Send any ICE candidates to the other peer
    this.peerConnection.addEventListener('icecandidate', ({
      candidate
    }) => {
      if (candidate) {
        console.log('[VIEWER] Generated ICE candidate');

        // When trickle ICE is enabled, send the ICE candidates as they are generated.
        if (useTrickleICE) {
          console.log('[VIEWER] Sending ICE candidate');
          this.signalingClient.sendIceCandidate(candidate);
        }
      } else {
        console.log('[VIEWER] All ICE candidates have been generated');

        // When trickle ICE is disabled, send the offer now that all the ICE candidates have ben generated.
        if (!useTrickleICE) {
          console.log('[VIEWER] Sending SDP offer');
          this.signalingClient.sendSdpOffer(this.peerConnection.localDescription);
        }
      }
    });

    // As remote tracks are received, add them to the remote view
    this.peerConnection.addEventListener('track', event => {
      console.log('[VIEWER] Received remote track');
      if (this.remoteViewSrcObject) {
        return
      }

      this.setRemoteViewSrcObject(event.streams[0])
    });

    console.log('[VIEWER] Starting viewer connection');
    this.signalingClient.open();
  }

  stop() {
    console.log('[VIEWER] Stopping viewer connection');
    if (this.signalingClient) {
      this.signalingClient.close();
      this.signalingClient = null;
    }

    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach(track => track.stop());
      this.remoteStream = null;
    }

    if (this.peerConnectionStatsInterval) {
      clearInterval(this.peerConnectionStatsInterval);
      this.peerConnectionStatsInterval = null;
    }

    if (this.localViewSrcObject) {
      this.localViewSrcObject = null;
    }

    if (this.remoteViewSrcObject) {
      this.remoteViewSrcObject = null;
    }

    if (this.dataChannel) {
      this.dataChannel = null;
    }
  }

  sendMessage(message) {
    if (this.dataChannel) {
      try {
        this.dataChannel.send(message);
      } catch (e) {
        console.error('[VIEWER] Send DataChannel: ', e.toString());
      }
    }
  }
}
