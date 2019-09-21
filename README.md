# Amazon Kinesis Video Streams WebRTC SDK for JavaScript

## Running WebRTC Test Page

1. Run `npm install` to download dependencies.
1. Run `npm run develop` to run the webserver.
1. Open the WebRTC test page at `http://localhost:3001`

You will need to provide an AWS region, AWS credentials, and a Channel Name.

The source code for the test page is in the [`examples`](examples) directory.

## Using the SDK
To use the SDK in your own project, you need to import the following:
1. The AWS JS SDK with `AWS.KinesisVideo` and `AWS.KinesisVideoSignaling` clients and `AWS.util`. 
A build with these clients is located at [`examples/aws-sdk.beta.min.js`](examples/aws-sdk.beta.min.js)
1. This KVS WebRTC SDK with the `KVSWebRTC.SignalingClient`. Builds are available in the [`dist`](dist) directory.

Documentation for the KVS WebRTC SDK Signaling Client can be found [here](dist/commonjs/SignalingClient.d.ts).
See the test page for a complete usage example.

## License

This project is licensed under the Apache-2.0 License.

