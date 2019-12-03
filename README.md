# Amazon Kinesis Video Streams WebRTC SDK for JavaScript

[![NPM version](https://img.shields.io/npm/v/amazon-kinesis-video-streams-webrtc.svg?style=flat-square)](https://www.npmjs.com/package/amazon-kinesis-video-streams-webrtc)
[![NPM downloads](https://img.shields.io/npm/dm/amazon-kinesis-video-streams-webrtc.svg?style=flat-square)](https://www.npmjs.com/package/amazon-kinesis-video-streams-webrtc)
[![NPM version](https://img.shields.io/npm/l/amazon-kinesis-video-streams-webrtc?style=flat-square)](https://www.npmjs.com/package/amazon-kinesis-video-streams-webrtc)


[![Build Status](https://img.shields.io/travis/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js/master?style=flat-square)](https://travis-ci.org/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js)
[![Build Status](https://img.shields.io/bundlephobia/minzip/amazon-kinesis-video-streams-webrtc?style=flat-square)]()
[![Coverage Status](https://codecov.io/gh/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js/branch/master/graph/badge.svg)](https://codecov.io/gh/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js)
[![Known Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/amazon-kinesis-video-streams-webrtc?style=flat-square)](https://snyk.io/test/github/awslabs/amazon-kinesis-video-streams-webrtc-sdk-js?targetFile=package.json)

This SDK is intended to be used along side the [AWS SDK for JS](https://github.com/aws/aws-sdk-js) to interface with the Amazon Kinesis Video Streams Signaling Service for WebRTC streaming.

## Installing
#### In the Browser
To use the SDK in the browser, simply add the following script tag to your HTML pages:

```
<srcipt src="https://unpkg.com/amazon-kinesis-video-streams-webrtc/dist/kvs-webrtc.min.js"></script>
```

The SDK classes are made available in the global window under the `KVSWebRTC` namespace. For example, `window.KVSWebRTC.SignalingClient`.

The SDK is also compatible with bundlers like Webpack. Follow the instructions in the next section to install the NodeJS module version.

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
You can start by trying out the SDK with a webcam on the demo [WebRTC test page](https://awslabs.github.io/amazon-kinesis-video-streams-webrtc-sdk-js/examples/index.html).

The first step in using the SDK in your own application is to follow the instructions above to install the SDK.

From there, refer to the example usage in the [`examples`](examples) directory for how to write an end-to-end WebRTC application that uses the SDK.

## Documentation
This section outlines all of the classes, events, methods, and configuration options for the SDK.

TODO: Generate with TypeDoc

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
