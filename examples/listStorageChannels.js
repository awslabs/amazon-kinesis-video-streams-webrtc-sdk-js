/**
 * This function lists all storage-configured signaling channel ARNs and their associated stream's ARN.
 */
async function listStorageChannels(formValues) {
    $('#logs-header')[0].scrollIntoView({
        block: 'start',
    });

    try {
        console.log('[LIST_STORAGE_CHANNELS] Attempting to list all storage-configured signaling channels and their associated stream');

        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
        });

        // Get all signaling channels
        const result = await kinesisVideoClient
            .listSignalingChannels(
            )
            .promise();
        let allChannels = result.ChannelInfoList;
        
        // Grab channel ARNs
        let allChannelARNs = allChannels.map((channel) => {
            return channel.ChannelARN
        });

        let output = [];
        // Print channel ARN and its storage stream ARN if media storage is enabled for the channel
        for(let channelARN of allChannelARNs)
        {
            let request = {
                ChannelARN: channelARN,
            }
            let storageResult = await kinesisVideoClient.describeMediaStorageConfiguration(request).promise();
            if(storageResult.MediaStorageConfiguration.Status === 'ENABLED') {
                output.push({
                    "ChannelARN" : channelARN,
                    "StreamARN"  : storageResult.MediaStorageConfiguration.StreamARN,
                })
            }
        }
        
        console.log("You have", output.length, "channels configured for storage:")
        console.log(output);

    } catch (e) {
        console.error('[LIST_STORAGE_CHANNELS] Encountered error:', e);
    }
}
