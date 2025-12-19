/**
 * This function calls joinStorageSessionAsViewer.
 */
async function joinStorageSessionAsViewerManually(formValues) {
    $('#logs-header')[0].scrollIntoView({
        block: 'start',
    });

    try {
        console.log('[JOIN_STORAGE_SESSION_AS_VIEWER] Calling JoinStorageSessionAsViewer for channel', formValues.channelName, 'and clientId', formValues.clientId);

        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo.KinesisVideoClient({
            region: formValues.region,
            credentials: {
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
            },
            endpoint: formValues.endpoint,
            useDualstackEndpoint: formValues.useDualStackEndpoints,
        });

        // Step 1: Obtain the ARN of the Signaling Channel
        const describeSignalingChannelResponse = await kinesisVideoClient
            .send(new AWS.KinesisVideo.DescribeSignalingChannelCommand({
                ChannelName: formValues.channelName,
            }));
        const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;

        // Step 2: Obtain the WEBRTC endpoint
        const getSignalingChannelEndpointResponse = await kinesisVideoClient
            .send(new AWS.KinesisVideo.GetSignalingChannelEndpointCommand({
                ChannelARN: channelARN,
                SingleMasterChannelEndpointConfiguration: {
                    Protocols: ['WEBRTC'],
                    Role: KVSWebRTC.Role.VIEWER,
                },
            }));
        const webrtcEndpoint = getSignalingChannelEndpointResponse.ResourceEndpointList[0].ResourceEndpoint;

        const kinesisVideoWebRTCStorageClient = new AWS.KinesisVideoWebRTCStorage.KinesisVideoWebRTCStorageClient({
            region: formValues.region,
            credentials: {
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
            },
            endpoint: webrtcEndpoint,
            maxRetries: 0,
            httpOptions: {
                timeout: retryIntervalForJoinStorageSession,
            },
            logger: formValues.logAwsSdkCalls ? console : undefined,
        });

        // Step 3. Call JoinStorageSessionAsViewer
        await kinesisVideoWebRTCStorageClient
            .send(new AWS.KinesisVideoWebRTCStorage.JoinStorageSessionAsViewerCommand({
                channelArn: channelARN,
                clientId: formValues.clientId,
            }));

        console.log('[JOIN_STORAGE_SESSION_AS_VIEWER] Finished invoking JoinStorageSessionAsViewer for channel', formValues.channelName, 'and clientId', formValues.clientId);
    } catch (e) {
        console.error('[JOIN_STORAGE_SESSION_AS_VIEWER] Encountered error:', e);
    }
}
