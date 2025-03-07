import * as KinesisVideo from "@aws-sdk/client-kinesis-video";
import * as KinesisVideoSignaling from "@aws-sdk/client-kinesis-video-signaling";
import * as KinesisVideoWebRTCStorage from "@aws-sdk/client-kinesis-video-webrtc-storage";

// Webpack configuration places these into window.AWS object
// Should be accessible: window.AWS.KinesisVideo.KinesisVideoClient(...)
export {
    KinesisVideo,
    KinesisVideoSignaling,
    KinesisVideoWebRTCStorage
};
