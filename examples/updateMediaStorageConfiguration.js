/**
 * This function updates the media storage configuration.
 */
async function updateMediaStorageConfiguration(formValues) {
    $('#logs-header')[0].scrollIntoView({
        block: 'start',
    });

    try {
        console.log(
            '[UPDATE_MEDIA_STORAGE_CONFIGURATION] Attempting to update media storage configuration to have media from',
            formValues.channelName,
            formValues.streamName ? '' : 'not',
            'to be ingested and stored',
            formValues.streamName ? ' in ' + formValues.streamName : '',
        );

        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo.KinesisVideoClient({
            region: formValues.region,
            credentials: {
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
            },
            endpoint: formValues.endpoint,
        });

        if (formValues.streamName) {
            // We want to update the media storage configuration

            // First, grab the Stream ARN
            const describeStreamResponse = await kinesisVideoClient.send(new AWS.KinesisVideo.DescribeStreamCommand({ StreamName: formValues.streamName }));
            const streamARN = describeStreamResponse.StreamInfo.StreamARN;

            // Then, grab the Channel ARN
            const describeSignalingChannelResponse = await kinesisVideoClient.send(new AWS.KinesisVideo.DescribeSignalingChannelCommand({ ChannelName: formValues.channelName }));
            const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;

            // Finally, update the media storage configuration.
            await kinesisVideoClient
                .updateMediaStorageConfiguration({
                    ChannelARN: channelARN,
                    MediaStorageConfiguration: {
                        Status: 'ENABLED',
                        StreamARN: streamARN,
                    },
                })
                .promise();

            console.log('[UPDATE_MEDIA_STORAGE_CONFIGURATION] Success! Media for', channelARN, 'will be ingested and stored in', streamARN);
        } else {
            // We want to disable the media storage configuration

            // First, grab the Channel ARN
            const describeSignalingChannelResponse = await kinesisVideoClient.send(new AWS.KinesisVideo.DescribeSignalingChannelCommand({ ChannelName: formValues.channelName }));
            const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;

            // Then, update the media storage configuration.
            await kinesisVideoClient
                .send(new AWS.KinesisVideo.UpdateMediaStorageConfigurationCommand({
                    ChannelARN: channelARN,
                    MediaStorageConfiguration: {
                        Status: 'DISABLED',
                        StreamARN: null,
                    },
                }));

            console.log('[UPDATE_MEDIA_STORAGE_CONFIGURATION] Success! Media for', channelARN, 'will be no longer be ingested and stored');
        }
    } catch (e) {
        console.error('[UPDATE_MEDIA_STORAGE_CONFIGURATION] Encountered error:', e);
    }
}
