/**
 * This function calls joinStorageSession.
 */
async function joinStorageSessionManually(formValues) {
    $('#logs-header')[0].scrollIntoView({
        block: 'start',
    });

    try {
        console.log('[JOIN_STORAGE_SESSION] Calling JoinStorageSession for channel', formValues.channelName);

        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
        });

        // Step 1: Obtain the ARN of the Signaling Channel
        const describeSignalingChannelResponse = await kinesisVideoClient
            .describeSignalingChannel({
                ChannelName: formValues.channelName,
            })
            .promise();
        const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;

        // Step 2: Obtain the WEBRTC endpoint
        const getSignalingChannelEndpointResponse = await kinesisVideoClient
            .getSignalingChannelEndpoint({
                ChannelARN: channelARN,
                SingleMasterChannelEndpointConfiguration: {
                    Protocols: ['WEBRTC'],
                    Role: KVSWebRTC.Role.MASTER,
                },
            })
            .promise();
        const webrtcEndpoint = getSignalingChannelEndpointResponse.ResourceEndpointList[0].ResourceEndpoint;

        const kinesisVideoWebRTCStorageClient = new AWS.KinesisVideoWebRTCStorage({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: webrtcEndpoint,
            maxRetries: 0,
            httpOptions: {
                timeout: retryIntervalForJoinStorageSession,
            },
        });

        // Step 3. Call JoinStorageSession
        await kinesisVideoWebRTCStorageClient
            .joinStorageSession({
                channelArn: channelARN,
            })
            .promise();

        console.log('[JOIN_STORAGE_SESSION] Finished invoking JoinStorageSession for channel', formValues.channelName);
    } catch (e) {
        console.error('[JOIN_STORAGE_SESSION] Encountered error:', e);
    }
}
