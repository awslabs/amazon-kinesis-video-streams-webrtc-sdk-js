class MediaHelper {
    static MediaRequestType = {
        VIDEO_ONLY: 1,
        AUDIO_AND_VIDEO: 2,
        AUDIO_ONLY: 3,
    };

    static async requestCamera(requestType = this.MediaRequestType.AUDIO_AND_VIDEO, idealWidthPx = 640, idealHeightPx = 480) {
        const resolution = {
            width: { ideal: idealWidthPx },
            height: { ideal: idealHeightPx },
        };

        let constraints;
        switch (requestType) {
            case this.MediaRequestType.VIDEO_ONLY:
                constraints = { video: resolution };
                break;
            case this.MediaRequestType.AUDIO_AND_VIDEO:
                constraints = { video: resolution, audio: true };
                break;
            case this.MediaRequestType.AUDIO_ONLY:
                constraints = { audio: true };
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

    // Currently unused.
    static async requestScreenShare(requestType = this.MediaRequestType.VIDEO_ONLY, idealWidthPx = 640, idealHeightPx = 480) {
        if (requestType !== this.MediaRequestType.VIDEO_ONLY && requestType !== this.MediaRequestType.AUDIO_AND_VIDEO) {
            throw 'Need video to screen share!';
        }
        const constraints = {
            video: {
                width: { ideal: idealWidthPx },
                height: { ideal: idealHeightPx },
                displaySurface: 'browser',
                logicalSurface: true,
                cursor: 'always',
            },
            // Note: not all browsers support audio screen sharing.
            // If the browser doesn't support it, this has no effect.
            audio: requestType === this.MediaRequestType.AUDIO_AND_VIDEO,
        };

        return await navigator.mediaDevices.getDisplayMedia(constraints);
    }
}
