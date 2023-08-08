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
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
        });

        const mediaStorageConfiguration = await kinesisVideoClient.describeMediaStorageConfiguration({ ChannelName: formValues.channelName }).promise();

        console.log('[DESCRIBE_MEDIA_STORAGE_CONFIGURATION]', mediaStorageConfiguration);
    } catch (e) {
        console.error('[DESCRIBE_MEDIA_STORAGE_CONFIGURATION] Encountered error:', e);
    }
}
