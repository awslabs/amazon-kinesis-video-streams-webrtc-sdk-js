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
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
        });

        // Get signaling channel ARN
        const createSignalingChannelResponse = await kinesisVideoClient
            .createSignalingChannel({
                ChannelName: formValues.channelName,
            })
            .promise();

        console.debug(createSignalingChannelResponse.ChannelARN);

        // Get signaling channel ARN
        const describeSignalingChannelResponse = await kinesisVideoClient
            .describeSignalingChannel({
                ChannelName: formValues.channelName,
            })
            .promise();
        const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
        console.log('[CREATE_SIGNALING_CHANNEL] Success! Channel ARN:', channelARN);
    } catch (e) {
        console.error('[CREATE_SIGNALING_CHANNEL] Encountered error:', e);
    }
}
