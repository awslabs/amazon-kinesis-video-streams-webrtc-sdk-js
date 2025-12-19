/**
 * This function fetches the media storage configuration.
 */
async function describeMediaStorageConfiguration(formValues) {
    $('#logs-header')[0].scrollIntoView({
        block: 'start',
    });

    try {
        console.log('[DESCRIBE_MEDIA_STORAGE_CONFIGURATION] Fetching the media storage configuration for', formValues.channelName);

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
            useDualstackEndpoint: formValues.useDualStackEndpoints,
        });

        const mediaStorageConfiguration = await kinesisVideoClient.send(new AWS.KinesisVideo.DescribeMediaStorageConfigurationCommand({ ChannelName: formValues.channelName }));

        console.log('[DESCRIBE_MEDIA_STORAGE_CONFIGURATION]', mediaStorageConfiguration);
    } catch (e) {
        console.error('[DESCRIBE_MEDIA_STORAGE_CONFIGURATION] Encountered error:', e);
    }
}
