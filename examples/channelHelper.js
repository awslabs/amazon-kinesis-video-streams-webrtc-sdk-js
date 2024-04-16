class ChannelHelper {
    static IngestionMode = {
        // P2P (no ingestion)
        OFF: 0,

        // Do not call DescribeMediaStorageConfiguration API, assume channel
        // is already configured for ingestion.
        ON: 1,

        // Call DescribeMediaStorageConfiguration API to dynamically determine
        // operating mode.
        DETERMINE_THROUGH_DESCRIBE: 2,
    };

    constructor(channelName, clientArgs, endpoint, role, ingestionMode, loggingPrefix) {
        this._channelName = channelName;
        this._clientArgs = clientArgs;
        this._role = role;
        this._endpoint = endpoint;
        this._ingestionMode = ingestionMode;
        this._loggingPrefix = loggingPrefix;
    }

    async init() {
        await this._initializeClients();
    }

    close() {
        this._signalingClient.close();
    }

    getChannelArn = () => {
        return this._channelArn;
    };

    getKinesisVideoClient = () => {
        return this._kinesisVideoClient;
    };

    getSignalingClient = () => {
        return this._signalingClient;
    };

    isIngestionEnabled = () => {
        return this._ingestionMode === this._ingestionMode.ON;
    };

    getWebRTCStorageClient = () => {
        return this._webrtcStorageClient;
    };

    fetchTurnServers = async () => {
        return (await this._signalingChannelsClient.getIceServerConfig({ ChannelARN: this._channelArn }).promise()).IceServerList.flatMap(iceServer => ({
            urls: iceServer.Uris,
            username: iceServer.Username,
            credential: iceServer.Password,
        }));
    };

    getSignalingConnectionLastStarted = () => {
        return this._signalingConnectionStarted;
    };

    // Creates the following clients and saves them as member variables.
    //   AWS.KinesisVideo                  --> this._kinesisVideoClient
    //   AWS.KinesisVideoSignalingChannels --> this._signalingChannelsClient
    //   KVSWebRTC.SignalingClient         --> this._signalingClient
    async _initializeClients() {
        // Kinesis Video Client
        // Used to invoke APIs under https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_Streams.html
        this._kinesisVideoClient = new AWS.KinesisVideo({
            ...this._clientArgs,
            endpoint: this._endpoint,
            correctClockSkew: true,
        });

        const describeSignalingChannelResponse = await this._kinesisVideoClient
            .describeSignalingChannel({
                ChannelName: this._channelName,
            })
            .promise();

        this._channelArn = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
        console.debug(this._loggingPrefix, 'Channel ARN:', this._channelArn);

        if (this._ingestionMode === ChannelHelper.IngestionMode.DETERMINE_THROUGH_DESCRIBE) {
            const describeMediaStorageConfigurationResponse = await this._kinesisVideoClient
                .describeMediaStorageConfiguration({
                    ChannelARN: master.channelARN,
                })
                .promise();
            const mediaStorageConfiguration = describeMediaStorageConfigurationResponse.MediaStorageConfiguration;

            if (mediaStorageConfiguration.Status === 'ENABLED' || mediaStorageConfiguration.StreamARN !== null) {
                this._ingestionMode = ChannelHelper.IngestionMode.ON;
            } else {
                this._ingestionMode = ChannelHelper.IngestionMode.OFF;
            }
        }

        const protocols = ['HTTPS', 'WSS'];
        if (this._ingestionMode === ChannelHelper.IngestionMode.ON) {
            protocols.push('WEBRTC');
        }

        // Result: { HTTPS: "https://...", WSS: "wss://..." }
        // Will include WEBRTC if in ingestionMode
        this._endpoints = await this._getSignalingChannelEndpoints(this._kinesisVideoClient, this._channelArn, this._role, protocols);

        // Kinesis Video Signaling Channels Client
        // Used to invoke APIs under https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_Signaling_Channels.html
        this._signalingChannelsClient = new AWS.KinesisVideoSignalingChannels({
            ...this._clientArgs,
            endpoint: this._endpoints['HTTPS'],
            correctClockSkew: true,
        });

        // Kinesis Video Signaling Client
        // Used to invoke APIs under https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/kvswebrtc-websocket-apis.html
        this._signalingClient = new KVSWebRTC.SignalingClient({
            channelARN: this._channelArn,
            channelEndpoint: this._endpoints['WSS'],
            role: this._role,
            region: this._clientArgs.region,
            credentials: {
                accessKeyId: this._clientArgs.accessKeyId,
                secretAccessKey: this._clientArgs.secretAccessKey,
                sessionToken: this._clientArgs.sessionToken,
            },
            requestSigner: {
                // Inside the function, `this` refers to the function itself,
                // not the surrounding object where _clientArgs is defined.
                // Arrow function preserves the lexical scope.
                getSignedURL: async (signalingEndpoint, queryParams, date) => {
                    const signer = new KVSWebRTC.SigV4RequestSigner(this._clientArgs.region, {
                        accessKeyId: this._clientArgs.accessKeyId,
                        secretAccessKey: this._clientArgs.secretAccessKey,
                        sessionToken: this._clientArgs.sessionToken,
                    });

                    const signingStart = new Date();
                    console.debug(this._loggingPrefix, 'Signing the url started at', signingStart);
                    const retVal = await signer.getSignedURL(signalingEndpoint, queryParams, date);
                    const signingEnd = new Date();
                    console.debug(this._loggingPrefix, 'Signing the url ended at', signingEnd);
                    console.log(this._loggingPrefix, 'Time to sign the request:', signingEnd.getTime() - signingStart.getTime(), 'ms');
                    this._signalingConnectionStarted = new Date();
                    console.log(this._loggingPrefix, 'Connecting to KVS Signaling...');
                    console.debug(
                        this._loggingPrefix,
                        `ConnectAs${this._role.charAt(0).toUpperCase()}${this._role.slice(1).toLowerCase()} started at ${this._signalingConnectionStarted}`,
                    );
                    return retVal;
                },
            },
            systemClockOffset: this._kinesisVideoClient.config.systemClockOffset,
        });

        if (this._ingestionMode.ON) {
            this._webrtcStorageClient = new AWS.KinesisVideoWebRTCStorage({
                ...this._clientArgs,
                endpoint: this._endpoints['WEBRTC'],
            });
        }
    }

    async _getSignalingChannelEndpoints(kinesisVideoClient, arn, role, protocols) {
        const getSignalingChannelEndpointResponse = await kinesisVideoClient
            .getSignalingChannelEndpoint({
                ChannelARN: arn,
                SingleMasterChannelEndpointConfiguration: {
                    Protocols: protocols,
                    Role: role,
                },
            })
            .promise();
        const endpointsByProtocol = getSignalingChannelEndpointResponse.ResourceEndpointList.reduce((endpoints, endpoint) => {
            endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint;
            return endpoints;
        }, {});
        console.debug(this._loggingPrefix, 'Endpoints:', endpointsByProtocol);
        return endpointsByProtocol;
    }
}
