# Amazon Kinesis Video Streams WebRTC SDK for JavaScript

[![NPM version](https://img.shields.io/npm/v/amazon-kinesis-video-streams-webrtc.svg?style=flat-square)](https://www.npmjs.com/package/amazon-kinesis-video-streams-webrtc)
[![NPM downloads](https://img.shields.io/npm/dm/amazon-kinesis-video-streams-webrtc.svg?style=flat-square)](https://www.npmjs.com/package/amazon-kinesis-video-streams-webrtc)
[![NPM version](https://img.shields.io/npm/l/amazon-kinesis-video-streams-webrtc?style=flat-square)](https://www.npmjs.com/package/amazon-kinesis-video-streams-webrtc)


[![Build Status](https://img.shields.io/travis/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js/master?style=flat-square)](https://travis-ci.org/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js)
[![Build Status](https://img.shields.io/bundlephobia/minzip/amazon-kinesis-video-streams-webrtc?style=flat-square)]()
[![Coverage Status](https://codecov.io/gh/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js/branch/master/graph/badge.svg)](https://codecov.io/gh/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js)
[![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/amazon-kinesis-video-streams-webrtc?style=flat-square)](https://snyk.io/test/github/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js?targetFile=package.json)

This SDK is intended to be used along side the [AWS SDK for JS](https://github.com/aws/aws-sdk-js) (version 2.585.0+) to interface with the Amazon Kinesis Video Streams Signaling Service for WebRTC streaming.

## Installing
#### In the Browser
To use the SDK in the browser, simply add the following script tag to your HTML pages:

```
<script src="https://unpkg.com/amazon-kinesis-video-streams-webrtc/dist/kvs-webrtc.min.js"></script>
```

The SDK classes are made available in the global window under the `KVSWebRTC` namespace. For example, `window.KVSWebRTC.SignalingClient`.

The SDK is also compatible with bundlers like Webpack. Follow the instructions in the next section to install the NodeJS module version for use with your bundler.

#### In NodeJS
The preferred way to install the SDK for NodeJS is to use the npm package manager. Simply type the following into a terminal window:

```
npm install amazon-kinesis-video-streams-webrtc
```

The SDK classes can then be imported like typical NodeJS modules:
```
// JavaScript
const SignalingClient = require('amazon-kinesis-video-streams-webrtc').SignalingClient;

// TypeScript
import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
```

## Getting Started
You can start by trying out the SDK with a webcam on the example [WebRTC test page](https://awslabs.github.io/amazon-kinesis-video-streams-webrtc-sdk-js/examples/index.html).

It is also recommended to develop familiarity with the WebRTC protocols and KVS Signaling Channel APIs. See the following resources:
* [KVS WebRTC Developer Guide](https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/what-is-kvswebrtc.html)
* [KVS API Reference Guide](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations.html)

The first step in using the SDK in your own application is to follow the [Installing](#installing) instructions above to install the SDK.

From there, see the [Usage](#usage) section below for guidance on using the SDK to build a WebRTC application.
Also refer to the [`examples`](examples) directory for examples on how to write an end-to-end WebRTC application that uses the SDK.

## Usage
This section demonstrates how to use this SDK along with the [AWS SDK for JS](https://github.com/aws/aws-sdk-js) (version 2.585.0+) to build a web-based viewer application.
Refer to the [`examples`](examples) directory for an example of a complete application including both a master and viewer role.

#### Viewer Example With Audio/Video From Local Webcam
These code snippets demonstrate how to build a viewer application that receives audio and video and also sends audio and video from a webcam back to the master.

##### Set Up Variables
```
// DescribeSignalingChannel API can also be used to get the ARN from a channel name.
const channelARN = 'arn:aws:kinesisvideo:us-west-2:123456789012:channel/test-channel/1234567890';

// AWS Credentials
const accessKeyId = 'ACCESS_KEY_ID_GOES_HERE';
const secretAccessKey = 'SECRET_ACCESS_KEY_GOES_HERE';

// <video> HTML elements to use to display the local webcam stream and remote stream from the master
const localView = document.getElementsByTagName('video')[0];
const remoteView = document.getElementsByTagName('video')[1];

const region = 'us-west-2';
const clientId = 'RANDOM_VALUE';
```

##### Create KVS Client
```
const kinesisVideoClient = new AWS.KinesisVideo({
    region,
    accessKeyId,
    secretAccessKey,
});
```

##### Get Signaling Channel Endpoints
Each signaling channel is assigned an HTTPS and WSS endpoint to connect to for data-plane operations. These can be discovered using the `GetSignalingChannelEndpoint` API.
```
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
```

##### Create KVS Signaling Client
The HTTPS endpoint from the `GetSignalingChannelEndpoint` response is used with this client. This client is just used for getting ICE servers, not for actual signaling.
```
const kinesisVideoSignalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
    region,
    accessKeyId,
    secretAccessKey,
    endpoint: endpointsByProtocol.HTTPS,
});
```

##### Get ICE server configuration
For best performance, we collect STUN and TURN ICE server configurations. The KVS STUN endpoint is always `stun:stun.kinesisvideo.${region}.amazonaws.com:443`.
To get TURN servers, the `GetIceServerConfig` API is used.
```
const getIceServerConfigResponse = await kinesisVideoSignalingChannelsClient
    .getIceServerConfig({
        ChannelARN: channelARN,
    })
    .promise();
const iceServers = [
    { urls: `stun:stun.kinesisvideo.${region}.amazonaws.com:443` }
];
getIceServerConfigResponse.IceServerList.forEach(iceServer =>
    iceServers.push({
        urls: iceServer.Uris,
        username: iceServer.Username,
        credential: iceServer.Password,
    }),
);
```

##### Create RTCPeerConnection
The [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) is the primary interface for WebRTC communications in the Web.
```
const peerConnection = new RTCPeerConnection({ iceServers });
```

##### Create WebRTC Signaling Client
This is the actual client that is used to send messages over the signaling channel.
```
signalingClient = new KVSWebRTC.SignalingClient({
    channelARN,
    channelEndpoint: endpointsByProtocol.WSS,
    clientId,
    role: KVSWebRTC.Role.VIEWER,
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});
```
##### Add Signaling Client Event Listeners
```
// Once the signaling channel connection is open, connect to the webcam and create an offer to send to the master
signalingClient.on('open', async () => {
    // Get a stream from the webcam, add it to the peer connection, and display it in the local view
    try {
        const localStream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: true,
        });
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
        localView.srcObject = localStream;
    } catch (e) {
        // Could not find webcam
        return;
    }

    // Create an SDP offer and send it to the master
    const offer = await viewer.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(offer);
    signalingClient.sendSdpOffer(viewer.peerConnection.localDescription);
});

// When the SDP answer is received back from the master, add it to the peer connection.
signalingClient.on('sdpAnswer', async answer => {
    await peerConnection.setRemoteDescription(answer);
});

// When an ICE candidate is received from the master, add it to the peer connection.
signalingClient.on('iceCandidate', candidate => {
    peerConnection.addIceCandidate(candidate);
});

signalingClient.on('close', () => {
    // Handle client closures
});

signalingClient.on('error', error => {
    // Handle client errors
});

```

##### Add Peer Connection Event Listeners
```
// Send any ICE candidates generated by the peer connection to the other peer
peerConnection.addEventListener('icecandidate', ({ candidate }) => {
    if (candidate) {
        signalingClient.sendIceCandidate(candidate);
    } else {
        // No more ICE candidates will be generated
    }
});

// As remote tracks are received, add them to the remote view
peerConnection.addEventListener('track', event => {
    if (remoteView.srcObject) {
        return;
    }
    remoteView.srcObject = event.streams[0];
});
```

##### Open Signaling Connection
```
signalingClient.open();
```

## Documentation
This section outlines all of the classes, events, methods, and configuration options for the SDK.

### Class: `SignalingClient`
This class is the main class for interfacing with the KVS signaling service. It extends `EventEmitter`.

#### Constructor: `new SignalingClient(config)`
* `config` {object}
  * `role` {Role} "MASTER" or "VIEWER".
  * `channelARN` {string} ARN of a channel that exists in the AWS account.
  * `channelEndpoint` {string} KVS Signaling Service endpoint. Should be the "WSS" endpoint from calling the `GetSignalingChannel` API.
  * `region` {string} AWS region that the channel exists in.
  * `clientId` {string} Identifier to uniquely identify this client when connecting to the KVS Signaling Service. Required if the `role` is "VIEWER". A value should not be provided if the `role` is "MASTER".
  * `credentials` {object}
    * `accessKeyId` {string} AWS access key id.
    * `secretAccessKey` {string} AWS secret access key.
    * `sessionToken` {string} Optional. AWS session token.
  * `requestSigner` {function (signalingEndpoint: string, queryParams: object) => Promise<string>} Optional. A custom method for overriding the default SigV4 request signing.

#### Event: `'open'`
Emitted when the connection to the signaling service is open.

#### Event: `'sdpOffer'`
* `sdpOffer` {[RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription)} The SDP offer received from the signaling service.
* `senderClientId` {string} The client id of the source of the SDP offer. The value will be null if the SDP offer is from the master.

Emitted when a new SDP offer is received over the channel. Typically only a master should receive SDP offers.

#### Event: `'sdpAnswer'`
* `sdpAnswer` {[RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription)} The SDP answer received from the signaling service.
* `senderClientId` {string} The client id of the source of the SDP answer. The value will be null if the SDP answer is from the master.

Emitted when a new SDP answer is received over the channel. Typically only a viewer should receive SDP answers.

#### Event: `'iceCandidate'`
* `iceCandidate` {[RTCIceCandidate](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate)} The ICE candidate received from the signaling service.
* `senderClientId` {string} The client id of the source of the ICE candidate. The value will be null if the ICE candidate is from the master.

Emitted when a new ICE candidate is received over the channel.

#### Event: `'close'`
Emitted when the connection to the signaling service is closed. Even if there is an error, as long as the connection is closed, this event will be emitted.

#### Event: `'error'`
* `error` {Error}

Emitted when there is an error in the client or there is an error received from the signaling service. The connection will be closed automatically.

#### Method: `on(event, callback)`
* `event` {string} Event name.
* `callback` {function} Event handler.

Binds an event handler.

#### Method: `open()`
Opens a connection to the signaling service. An error will be thrown if there is already another connection open or opening.

#### Method: `close()`
Closes the active connection to the signaling service. Nothing will happen if there is no open connection.

#### Method: `sendSdpOffer(sdpOffer, [recipientClientId])`
* `sdpOffer` {[RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription)} SDP offer to send to the recipient client.
* `recipientClientId` {string} The id of the client to send the SDP offer to. If no id is provided, it will be sent to the master.

#### Method: `sendSdpAnswer(sdpAnswer, [recipientClientId])`
* `sdpAnswer` {[RTCSessionDescription](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription)} SDP answer to send to the recipient client.
* `recipientClientId` {string} The id of the client to send the SDP answer to. If no id is provided, it will be sent to the master.

#### Method: `sendIceCandidate(iceCandidate, [recipientClientId])`
* `iceCandidate` {[RTCIceCandidate](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate)} ICE candidate to send to the recipient client.
* `recipientClientId` {string} The id of the client to send the ICE candidate to. If no id is provided, it will be sent to the master.

### Enum: `Role`
An enum with the following values:
* `MASTER`
* `VIEWER`

## Compatibility

The SDK is supported in the following browsers / environments:

| Chrome | Edge | Firefox | IE  | Safari | Android Webview | Android Chrome | iOS Safari | NodeJS |
| ------ | ---- | ------- | --- | ------ | --------------- | -------------- | ---------- | ------ |
| 52     | 12   | 36      | No  | 11     | 53              | 52             | 11         | 8      |

## Development

#### Running WebRTC Test Page Locally
The SDK and test page can be edited and run locally by following these instructions:

NodeJS version 8+ is required.

1. Run `npm install` to download dependencies.
1. Run `npm run develop` to run the webserver.
1. Open the WebRTC test page at `http://localhost:3001`

You will need to provide an AWS region, AWS credentials, and a Channel Name.

The source code for the test page is in the [`examples`](examples) directory.

## License

This project is licensed under the [Apache-2.0 License](http://www.apache.org/licenses/LICENSE-2.0). See LICENSE.txt and NOTICE.txt for more information.
