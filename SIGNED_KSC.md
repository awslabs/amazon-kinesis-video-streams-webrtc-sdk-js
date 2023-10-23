## WebRTC using Sigv4 Signed URL

### Background
This client tool allows you to make SDP offer with ARN of the Kinesis signaling channel and AWS credentials (Access ID, Secret Access Key and Session Token) and then creates the `RTCPeerConnection` for webrtc between master and multiple viewers.

An alternate way of achieving the same is to use V4 Signed URL and passing in ICE servers (udp, secure udp and tls/secure tcp).

### Connect using Signed V4 URL
For this, you need to generate a Signed V4 WSS URL. There are JS and Golang AWS V4 Signer utilities to achieve this. For details on how to generate this, please contact akundu@rivian.com or mnair@rivian.com.

The signed URL is valid for 5min to establish the websocket connection used for SDP negotiation.

You need to provide the Signed URL, ICE Servers and user/password. The tool requires AWS credentials currently (as required by minified SDK) but you can pass any garbage values.


![Form Inputs for V4 signer based request URL](signed_ksc_mv_inputs.png)

### Logs sample

Here are the logs from client when starting in Master and Viewer.

#### Master logs

```
[2023-10-23T03:03:13.503Z] [INFO] Page loaded
[2023-10-23T03:03:13.593Z] [INFO] [FETCH-REGIONS] Successfully fetched regions!
[2023-10-23T03:05:55.622Z] [INFO] [FORM_VALUES] Running the sample with the following options: {
  "region": "us-east-1",
  "channelName": "test",
  "clientId": "3C4FE2ERTXM",
  "sendVideo": true,
  "sendAudio": false,
  "streamName": "",
  "ingestMedia": false,
  "openDataChannel": true,
  "widescreen": true,
  "fullscreen": false,
  "useTrickleICE": true,
  "natTraversalDisabled": false,
  "forceSTUN": false,
  "forceTURN": true,
  "accessKeyId": "***",
  "endpoint": null,
  "signedEndpoint": "wss://m-07e4d66a.kinesisvideo.us-east-1.amazonaws.com/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-ChannelARN=arn%3Aaws%3Akinesisvideo%3Aus-east-1%3A463603311461%3Achannel%2Fdp-gearguard-vssc-JDJhJDA0JC9OTnlicWxubGNFLldUNHZSdmt6a3VManljNmNGMGltQ3NpMGVLbVh2VzZtQ2hKYkxVTU1x%2F1698028509079&X-Amz-ClientId=viewer-1&X-Amz-Credential=ASIAWX4HJENS7GJL3WGL%2F20231023%2Fus-east-1%2Fkinesisvideo%2Faws4_request&X-Amz-Date=20231023T030508Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIBM0A3kkAZnkGUQl5kNdKTV1WLEekJq9ZJdvemSC6MGJAiEAkdYiwx%2BprVFqHUsb3NTQJzeS1s%2B0JYvvQgUYQ5t4gVEqi******8jmpXCcEAwxT3IyrGUkCVnck40rubOxC%2Fhbxr0%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=68708d43d8fd3e923fb3656146f11f9d672b330235ced28c72566e8fb15084c9",
  "turnEndpoint1": "turn:54-242-44-117.t-64e51873.kinesisvideo.us-east-1.amazonaws.com:443?transport=udp",
  "turnEndpoint2": "turns:54-242-44-117.t-64e51873.kinesisvideo.us-east-1.amazonaws.com:443?transport=udp",
  "turnEndpoint3": "turns:54-242-44-117.t-64e51873.kinesisvideo.us-east-1.amazonaws.com:443?transport=tcp",
  "turnUsername": "1698030608:djE6YXJuOmF3czpraW5lc2lzdmlkZW86dXMtZWFzdC0xOjQ2MzYwMzMxMTQ2MTpjaGFubmVsL2RwLWdlYXJndWFyZC12c3NjLUpESmhKREEwSkM5T1RubGljV3h1YkdORkxsZFVOSFpTZG10NmEzVk1hbmxqTm1OR01HbHRRM05wTUdWTGJWaDJWelp0UTJoS1lreFZUVTF4LzE2OTgwMjg1MDkwNzk=",
  "turnPassword": "VnSpCa8ZNm4Cc9ibFnZVnoBk2Enum5SLYFM9tsq2CGM=",
  "secretAccessKey": "***",
  "enableDQPmetrics": false
}
[2023-10-23T03:06:00.516Z] [INFO] [MASTER] ICE servers: []
[2023-10-23T03:06:00.522Z] [INFO] [MASTER] Starting master connection
[2023-10-23T03:06:01.616Z] [INFO] [MASTER] Connected to signaling service
[2023-10-23T03:06:01.616Z] [INFO] [MASTER] Waiting for peers to join...
[2023-10-23T03:06:28.261Z] [INFO] [MASTER] Received SDP offer from client: viewer-1
[2023-10-23T03:06:28.268Z] [INFO] [MASTER] Received remote track from client: viewer-1
[2023-10-23T03:06:28.269Z] [INFO] [MASTER] Creating SDP answer for client: viewer-1
[2023-10-23T03:06:28.275Z] [INFO] [MASTER] Sending SDP answer to client: viewer-1
[2023-10-23T03:06:28.276Z] [INFO] [MASTER] Generating ICE candidates for client: viewer-1
[2023-10-23T03:06:28.779Z] [INFO] [MASTER] Received ICE candidate from client: viewer-1
[2023-10-23T03:06:28.783Z] [INFO] [MASTER] Received ICE candidate from client: viewer-1
[2023-10-23T03:06:28.807Z] [INFO] [MASTER] Received ICE candidate from client: viewer-1
[2023-10-23T03:06:28.847Z] [INFO] [MASTER] Generated ICE candidate for client: viewer-1
[2023-10-23T03:06:28.847Z] [INFO] [MASTER] Sending ICE candidate to client: viewer-1
[2023-10-23T03:06:28.859Z] [INFO] [MASTER] Received ICE candidate from client: viewer-1
[2023-10-23T03:06:28.898Z] [INFO] [MASTER] Received ICE candidate from client: viewer-1
[2023-10-23T03:06:28.909Z] [INFO] [MASTER] Generated ICE candidate for client: viewer-1
[2023-10-23T03:06:28.910Z] [INFO] [MASTER] Sending ICE candidate to client: viewer-1
[2023-10-23T03:06:28.924Z] [INFO] [MASTER] Received ICE candidate from client: viewer-1
[2023-10-23T03:06:29.389Z] [INFO] [MASTER] Received ICE candidate from client: viewer-1
[2023-10-23T03:06:29.395Z] [INFO] [MASTER] Received ICE candidate from client: viewer-1
[2023-10-23T03:06:29.689Z] [INFO] [MASTER] Generated ICE candidate for client: viewer-1
[2023-10-23T03:06:29.690Z] [INFO] [MASTER] Sending ICE candidate to client: viewer-1
[2023-10-23T03:06:29.736Z] [INFO] [MASTER] Generated ICE candidate for client: viewer-1
[2023-10-23T03:06:29.737Z] [INFO] [MASTER] Sending ICE candidate to client: viewer-1
[2023-10-23T03:06:29.815Z] [INFO] [MASTER] All ICE candidates have been generated for client: viewer-1
[2023-10-23T03:06:30.759Z] [INFO] [MASTER] Connection to peer successful!
```

#### Viewer logs

```
[2023-10-23T03:03:13.590Z] [INFO] Page loaded
[2023-10-23T03:03:13.639Z] [INFO] [FETCH-REGIONS] Successfully fetched regions!
[2023-10-23T03:04:29.549Z] [INFO] [FORM_VALUES] Running the sample with the following options: {
  "region": "us-east-1",
  "channelName": "test",
  "clientId": "W2ETBO6OFY",
  "sendVideo": true,
  "sendAudio": false,
  "streamName": "",
  "ingestMedia": false,
  "openDataChannel": true,
  "widescreen": true,
  "fullscreen": false,
  "useTrickleICE": true,
  "natTraversalDisabled": false,
  "forceSTUN": false,
  "forceTURN": true,
  "accessKeyId": "***",
  "endpoint": null,
  "signedEndpoint": "wss://v-304dd9d0.kinesisvideo.us-east-1.amazonaws.com/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-ChannelARN=arn%3Aaws%3Akinesisvideo%3Aus-east-1%3A463603311461%3Achannel%2Fdp-gearguard-vssc-JDJhJDA0JC9OTnlicWxubGNFLldUNHZSdmt6a3VManljNmNGMGltQ3NpMGVLbVh2VzZtQ2hKYkxVTU1x%2F1698028509079&X-Amz-ClientId=viewer-1&X-Amz-Credential=ASIAWX4HJENS7AMC36VW%2F20231023%2Fus-east-1%2Fkinesisvideo%2Faws4_request&X-Amz-Date=20231023T030336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQD2ii%2FsAoyViEko%2BzzV7XkJKmXQGSUigqfuFuv4JsANKwIhAPF5WT8J5M%2BkXiGQ51rroJ0EEM9RuqQgEoRpbUtHVY****sYYslSP%2BGM0dA29w%2FbaDPgwoRgKh1aMwd1FItQJkzaQryDal%2BJQbdVgXmnZfYr41%2BFOIvbQo1dKqG7KLzD%2BpZB3zdosVO8%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=f9bd113455e1ca188a0b7f070a68746006ea78d348cad432601b5d689de1665f",
  "turnEndpoint1": "turn:44-201-52-248.t-64e51873.kinesisvideo.us-east-1.amazonaws.com:443?transport=udp",
  "turnEndpoint2": "turns:44-201-52-248.t-64e51873.kinesisvideo.us-east-1.amazonaws.com:443?transport=udp",
  "turnEndpoint3": "turns:44-201-52-248.t-64e51873.kinesisvideo.us-east-1.amazonaws.com:443?transport=tcp",
  "turnUsername": "1698030516:djE6YXJuOmF3czpraW5lc2lzdmlkZW86dXMtZWFzdC0xOjQ2MzYwMzMxMTQ2MTpjaGFubmVsL2RwLWdlYXJndWFyZC12c3NjLUpESmhKREEwSkM5T1RubGljV3h1YkdORkxsZFVOSFpTZG10NmEzVk1hbmxqTm1OR01HbHRRM05wTUdWTGJWaDJWelp0UTJoS1lreFZUVTF4LzE2OTgwMjg1MDkwNzk=",
  "turnPassword": "bXGy/2vmRCOMUtVz8NEEAdTuO1bvBcKpu8bwjegVQ14=",
  "secretAccessKey": "***",
  "enableDQPmetrics": false
}
[2023-10-23T03:04:29.552Z] [INFO] [VIEWER] Client id is: W2ETBO6OFY
[2023-10-23T03:04:42.832Z] [INFO] [VIEWER] Starting viewer connection
[2023-10-23T03:04:44.251Z] [INFO] [VIEWER] Connected to signaling service
[2023-10-23T03:04:46.439Z] [INFO] [VIEWER] Creating SDP offer
[2023-10-23T03:04:46.444Z] [INFO] [VIEWER] Sending SDP offer
[2023-10-23T03:04:46.445Z] [INFO] [VIEWER] Generating ICE candidates
[2023-10-23T03:04:47.060Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.061Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.061Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.062Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.076Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.077Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.133Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.133Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.134Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.134Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.135Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.135Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.930Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.932Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.932Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.933Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.933Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.933Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.933Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.933Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.934Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.934Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:04:47.934Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:04:47.934Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:05:26.465Z] [INFO] [VIEWER] All ICE candidates have been generated
[2023-10-23T03:06:19.767Z] [INFO] [VIEWER] Stopping viewer connection
[2023-10-23T03:06:20.051Z] [INFO] [VIEWER] Disconnected from signaling channel
[2023-10-23T03:06:23.902Z] [INFO] [FORM_VALUES] Running the sample with the following options: {
  "region": "us-east-1",
  "channelName": "test",
  "clientId": "U9ZGYDOJDFP",
  "sendVideo": true,
  "sendAudio": false,
  "streamName": "",
  "ingestMedia": false,
  "openDataChannel": true,
  "widescreen": true,
  "fullscreen": false,
  "useTrickleICE": true,
  "natTraversalDisabled": false,
  "forceSTUN": false,
  "forceTURN": true,
  "accessKeyId": "***",
  "endpoint": null,
  "signedEndpoint": "wss://v-304dd9d0.kinesisvideo.us-east-1.amazonaws.com/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-ChannelARN=arn%3Aaws%3Akinesisvideo%3Aus-east-1%3A463603311461%3Achannel%2Fdp-gearguard-vssc-JDJhJDA0JC9OTnlicWxubGNFLldUNHZSdmt6a3VManljNmNGMGltQ3NpMGVLbVh2VzZtQ2hKYkxVTU1x%2F1698028509079&X-Amz-ClientId=viewer-1&X-Amz-Credential=ASIAWX4HJENS7AMC36VW%2F20231023%2Fus-east-1%2Fkinesisvideo%2Faws4_request&X-Amz-Date=20231023T030336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQD2ii%2FsAoyViEko%2BzzV7XkJKmXQGSUigqfuFuv4JsANKwIhAPF5WT8J5M%2BkXiGQ51rroJ0EEM9RuqQgEoRpbUtHVYarKokFCCQQAhoMNDYzNjAzMzExNDYxIgzzecUNNZqd5gFRndwq5gTCN81Tr67vOrrhqf%2FkhIgXD2EEXk3dlWeOxq6140Mn1jDj1r%2FUo94UIeHnCNob6YaXmPhnAvbGQidbtDkhUxKfglXZ6k%2BxSxudzPwX1kDRUUqRDINFw0OZr7hjRyhItVLAMJBbe25t4tfNZVm1QNAcLrEKlmfe9b3FW0RwCAl5vTD%2Fm5PcTSTqSkxBkA42b4ER6EiCuSxu1xTW8mztRdSfbAIR4GnAS6H4UGuRuu5AaP4UnUU%2Bm6esyITQz1VAOLqsQpwDK8Zw31M6ZsMKB05kXgS715nZz9%2B5%2BQEPIUcCcJPwgJjzBSa6R9wRnS%2FBhltQVazDT6%2F7hczgCRQ2pmQ6dJ7qrw8A6c8pfkLWfE76sWvl0K8F4nxAEyYN0YqIcDVONf0hue%2F8ufdXYXIHmZjbuxo04NU5ckzxvFdYsmlgzp0yzhjHznRGPXhpUCk5EfxiIfPEW7EpxKKZW0o61WzfeIoCbG1pHvsjUmR%2FuMaZ5GLRLg%2Bpi8AJoOStLjzl20KogDXe8u8eZBStKzFXYxeP2Y78fyeXt%2Fjo5px5vy0Xg49PpweiySep46gi88NlQGQc4plIxJFyWWvPehRZyJHT2C5ZI%2FuGK7TjGsSHE5Kg4yAtW86kk%2F5heFX7l2C3dNaB2RJkUiWSgjuGifvwhyuahPfHoWZOnRcSqex0TuqK833M0N6Tydusld9Q7uopKCk8T0mQBDTuW98O8CwerHykbPAuX0U2npXSqlz441Q9%2FOzx6QgRn7don9BnHckhCbmGTasGE1h1vjx%2FCUdUTDHPZKJ%2BDI3XCHh2zVkmLRR17S%2BeZ1kOyjCIxdepBjqaATMetClY1gYzALfOWB48V%2FvOf15w82jC%2BstgyJNywMEhwLtQl0mAvAXOzw7GEszgn85aGq9QXsHZD9RsxAwO%2FsQB6oY28GNqlODdx8xEOk5t8lsjSsYYslSP%2BGM0dA29w%2FbaDPgwoRgKh1aMwd1FItQJkzaQryDal%2BJQbdVgXmnZfYr41%2BFOIvbQo1dKqG7KLzD%2BpZB3zdosVO8%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=f9bd113455e1ca188a0b7f070a68746006ea78d348cad432601b5d689de1665f",
  "turnEndpoint1": "turn:44-201-52-248.t-64e51873.kinesisvideo.us-east-1.amazonaws.com:443?transport=udp",
  "turnEndpoint2": "turns:44-201-52-248.t-64e51873.kinesisvideo.us-east-1.amazonaws.com:443?transport=udp",
  "turnEndpoint3": "turns:44-201-52-248.t-64e51873.kinesisvideo.us-east-1.amazonaws.com:443?transport=tcp",
  "turnUsername": "1698030516:djE6YXJuOmF3czpraW5lc2lzdmlkZW86dXMtZWFzdC0xOjQ2MzYwMzMxMTQ2MTpjaGFubmVsL2RwLWdlYXJndWFyZC12c3NjLUpESmhKREEwSkM5T1RubGljV3h1YkdORkxsZFVOSFpTZG10NmEzVk1hbmxqTm1OR01HbHRRM05wTUdWTGJWaDJWelp0UTJoS1lreFZUVTF4LzE2OTgwMjg1MDkwNzk=",
  "turnPassword": "bXGy/2vmRCOMUtVz8NEEAdTuO1bvBcKpu8bwjegVQ14=",
  "secretAccessKey": "***",
  "enableDQPmetrics": false
}
[2023-10-23T03:06:23.905Z] [INFO] [VIEWER] Client id is: U9ZGYDOJDFP
[2023-10-23T03:06:26.864Z] [INFO] [VIEWER] Starting viewer connection
[2023-10-23T03:06:27.909Z] [INFO] [VIEWER] Connected to signaling service
[2023-10-23T03:06:27.913Z] [INFO] [VIEWER] Creating SDP offer
[2023-10-23T03:06:27.917Z] [INFO] [VIEWER] Sending SDP offer
[2023-10-23T03:06:27.918Z] [INFO] [VIEWER] Generating ICE candidates
[2023-10-23T03:06:28.456Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:06:28.456Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:06:28.458Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:06:28.458Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:06:28.466Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:06:28.467Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:06:28.531Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:06:28.532Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:06:28.532Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:06:28.532Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:06:28.533Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:06:28.533Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:06:28.610Z] [INFO] [VIEWER] Received SDP answer
[2023-10-23T03:06:28.614Z] [INFO] [VIEWER] Received remote track
[2023-10-23T03:06:29.053Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:06:29.054Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:06:29.054Z] [INFO] [VIEWER] Generated ICE candidate
[2023-10-23T03:06:29.054Z] [INFO] [VIEWER] Sending ICE candidate
[2023-10-23T03:06:29.164Z] [INFO] [VIEWER] Received ICE candidate
[2023-10-23T03:06:29.232Z] [INFO] [VIEWER] Received ICE candidate
[2023-10-23T03:06:29.634Z] [INFO] [VIEWER] All ICE candidates have been generated
[2023-10-23T03:06:30.010Z] [INFO] [VIEWER] Received ICE candidate
[2023-10-23T03:06:30.058Z] [INFO] [VIEWER] Received ICE candidate
[2023-10-23T03:06:30.522Z] [INFO] [VIEWER] Connection to peer successful!
```