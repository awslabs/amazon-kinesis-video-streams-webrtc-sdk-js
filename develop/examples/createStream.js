/**
 * This file demonstrates the process of creating a Kinesis Video Stream.
 */
async function createStream(formValues) {
    try {
        console.log(
            '[CREATE_STREAM] Attempting to create a Kinesis Video Stream with name',
            formValues.streamName,
            'with',
            formValues.retentionInHours,
            'hours of retention.',
        );
        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo.KinesisVideoClient({
            credentials: {
                accessKeyId: formValues.accessKeyId,
                secretAccessKey: formValues.secretAccessKey,
                sessionToken: formValues.sessionToken,
            },
            region: formValues.region,
            endpoint: formValues.endpoint,
            logger: formValues.logAwsSdkCalls ? console : undefined,
            useDualstackEndpoint: formValues.useDualStackEndpoints,
        });

        const createStreamResponse = await kinesisVideoClient
            .send(new AWS.KinesisVideo.CreateStreamCommand({
                StreamName: formValues.streamName,
                DataRetentionInHours: parseInt(formValues.retentionInHours),
            }));

        console.log('[CREATE_STREAM] Success! Stream ARN:', createStreamResponse.StreamARN);
    } catch (e) {
        console.error('[CREATE_STREAM] Encountered error:', e);
    }
}
