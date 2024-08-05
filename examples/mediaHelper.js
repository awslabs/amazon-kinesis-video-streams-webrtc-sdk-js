class MediaHelper {
    // Constants for different media request types
    static MediaRequestType = {
        VIDEO_ONLY: 1,
        AUDIO_AND_VIDEO: 2,
        AUDIO_ONLY: 3,
    };

    // Async function to request camera access.
    // idealWidthPx and idealHeightPx is only used if VIDEO
    // or AUDIO_AND_VIDEO is requested.
    // Returns a MediaStream upon success. Otherwise, null.
    static async requestCamera(requestType = this.MediaRequestType.AUDIO_AND_VIDEO, idealWidthPx = 640, idealHeightPx = 480) {
        const resolution = {
            width: {ideal: idealWidthPx},
            height: {ideal: idealHeightPx},
        };

        let constraints;
        switch (requestType) {
            case this.MediaRequestType.VIDEO_ONLY:
                constraints = {video: resolution};
                break;
            case this.MediaRequestType.AUDIO_AND_VIDEO:
                constraints = {video: resolution, audio: true, frameRate: { min: 10, max: 10 }};
                break;
            case this.MediaRequestType.AUDIO_ONLY:
                constraints = {audio: true};
                break;
            default:
                throw `requestCamera(): Unhandled case: ${requestType}!`;
        }

        try {
            return await navigator.mediaDevices.getUserMedia(constraints);
        } catch (e) {
            console.error(`Could not find ${Object.keys(constraints)} input device.`, e);
            return null;
        }
    }
}
