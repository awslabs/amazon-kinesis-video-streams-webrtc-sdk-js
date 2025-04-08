/**
 * This file demonstrates the process of creating a KVS Signaling Channel.
 */
async function createSignalingChannel(formValues) {
    $('#logs-header')[0].scrollIntoView({
        block: 'start',
    });

    try {
        console.log('[CREATE_SIGNALING_CHANNEL] Attempting to create signaling channel with name', formValues.channelName);
        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo.KinesisVideoClient({
            region: formValues.region,
            credentials: {
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
            },
            endpoint: formValues.endpoint,
            logger: formValues.logAwsSdkCalls ? console : undefined,
        });

        // Create signaling channel
        const createSignalingChannelResponse = await kinesisVideoClient
            .send(new AWS.KinesisVideo.CreateSignalingChannelCommand({
                ChannelName: formValues.channelName,
            }));

        console.debug(createSignalingChannelResponse.ChannelARN);

        // Get signaling channel ARN
        const describeSignalingChannelResponse = await kinesisVideoClient
            .send(new AWS.KinesisVideo.DescribeSignalingChannelCommand({
                ChannelName: formValues.channelName,
            }));
        const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
        console.log('[CREATE_SIGNALING_CHANNEL] Success! Channel ARN:', channelARN);
    } catch (e) {
        console.error('[CREATE_SIGNALING_CHANNEL] Encountered error:', e);
    }
}
