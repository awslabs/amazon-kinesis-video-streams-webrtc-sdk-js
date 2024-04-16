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

    // Must be called first
    // Creates all the clients used to interface with Kinesis Video Streams Signaling
    async init() {
        await this._initializeClients();
    }

    // Returns the Signaling Channel ARN
    // Only available after init()
    getChannelArn = () => {
        return this._channelArn;
    };

    // Returns the KinesisVideo client
    // Used to invoke APIs under https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_Streams.html
    // Only available after init()
    getKinesisVideoClient = () => {
        return this._kinesisVideoClient;
    };

    // Returns the Signaling WebSocket client
    // Used to invoke APIs under https://docs.aws.amazon.com/kinesisvideostreams-webrtc-dg/latest/devguide/kvswebrtc-websocket-apis.html
    // Only available after init()
    getSignalingClient = () => {
        return this._signalingClient;
    };

    // Returns true if this is in ingestion mode
    // If this was initialized with DETERMINE_THROUGH_DESCRIBE, after init() is
    // called, this will be updated accordingly
    isIngestionEnabled = () => {
        return this._ingestionMode === ChannelHelper.IngestionMode.ON;
    };

    // Returns the Kinesis Video WebRTC Storage Client
    // Used to invoke APIs under https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_WebRTC_Storage.html
    // Only available after init()
    getWebRTCStorageClient = () => {
        return this._webrtcStorageClient;
    };

    // Returns the Kinesis Video Stream ARN that this channel's media is ingested to
    // Only available after init(), and if this was initialized with DETERMINE_THROUGH_DESCRIBE
    // and the DescribeMediaStorageConfiguration API returned that this channel is configured for ingestion
    getStreamArn = () => {
        return this._streamArn;
    };

    // Fetch and return TURN servers
    // Only available after init()
    fetchTurnServers = async () => {
        return (await this._signalingChannelsClient.getIceServerConfig({ ChannelARN: this._channelArn }).promise()).IceServerList.flatMap(iceServer => ({
            urls: iceServer.Uris,
            username: iceServer.Username,
            credential: iceServer.Password,
        }));
    };

    // Returns the date immediately after the SigV4 Signer finishes signing the Connect to
    // Signaling WebSocket request. The WebSocket connection is started immediately after
    // the signing finishes.
    // Only available after the SignalingClient.open() is invoked. If SignalingClient.open()
    // is invoked multiple times, the most recent connection attempt's date is returned.
    getSignalingConnectionLastStarted = () => {
        return this._signalingConnectionStarted;
    };

    // Creates the following clients and saves them as member variables.
    //   AWS.KinesisVideo                         --> this._kinesisVideoClient
    //   AWS.KinesisVideoSignalingChannels        --> this._signalingChannelsClient
    //   KVSWebRTC.SignalingClient                --> this._signalingClient
    //   AWS.KinesisVideoWebRTCStorage (optional) --> this._webrtcStorageClient
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
                    ChannelARN: this._channelArn,
                })
                .promise();
            const mediaStorageConfiguration = describeMediaStorageConfigurationResponse.MediaStorageConfiguration;

            if (mediaStorageConfiguration.Status === 'ENABLED' && mediaStorageConfiguration.StreamARN !== null) {
                this._ingestionMode = ChannelHelper.IngestionMode.ON;
                this._streamArn = mediaStorageConfiguration.StreamARN;
            } else {
                this._ingestionMode = ChannelHelper.IngestionMode.OFF;
            }
        }

        const protocols = ['HTTPS', 'WSS'];
        if (this._ingestionMode === ChannelHelper.IngestionMode.ON) {
            protocols.push('WEBRTC');
        }

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
                // We override the default requestSigner to add timing information.
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

        if (this._ingestionMode === ChannelHelper.IngestionMode.ON) {
            // Kinesis Video WebRTC Storage Client
            // Used to invoke APIs under https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/API_Operations_Amazon_Kinesis_Video_WebRTC_Storage.html
            this._webrtcStorageClient = new AWS.KinesisVideoWebRTCStorage({
                ...this._clientArgs,
                endpoint: this._endpoints['WEBRTC'],
            });
        }
    }

    // Fetch the endpoints specified by the protocols.
    // Returns an object containing the protocols as keys and the
    // returned endpoint as values: { HTTPS: "https://...", WSS: "wss://..." }
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
