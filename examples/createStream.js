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
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
        });

        const createStreamResponse = await kinesisVideoClient
            .createStream({
                StreamName: formValues.streamName,
                DataRetentionInHours: formValues.retentionInHours,
            })
            .promise();

        console.log('[CREATE_STREAM] Success! Stream ARN:', createStreamResponse.StreamARN);
    } catch (e) {
        console.error('[CREATE_STREAM] Encountered error:', e);
    }
}
