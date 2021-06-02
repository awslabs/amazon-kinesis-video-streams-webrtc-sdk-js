import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc'
import AWS from 'aws-sdk'

export default class WebRtcClient {
  constructor(role, credentials, region, endpoint, channelName, clientId, natTraversalDisabled, forceTURN){
    this.role = role
    this.credentials = credentials
    this.region = region
    this.endpoint = endpoint || null
    this.channelName = channelName
    this.clientId = clientId
    this.natTraversalDisabled = natTraversalDisabled
    this.forceTURN = forceTURN

    this._channelARN = null
    this._endpointsByProtocol = null
    this._signalingClient = null
    this._iceServers = null

    this.kinesisVideoClient = new AWS.KinesisVideo({
      region: region,
      credentials: credentials,
      endpoint: endpoint  || null,
      correctClockSkew: true,
    })
  }

  getRandomClientId() {
      return Math.random()
          .toString(36)
          .substring(2)
          .toUpperCase();
  }

  async getChannelARN(){
    if(!this._channelARN){
      console.log(`Fetching channel ARN for channel ${this.channelName}`)
      // Get signaling channel ARN
      const response = await this.kinesisVideoClient.describeSignalingChannel({
        ChannelName: this.channelName,
      }).promise()

      console.log(`describeSignalingChannel Response: ${JSON.stringify(response)}`)
      this._channelARN = response.ChannelInfo.ChannelARN
      console.log(`Channel ARN: ${this._channelARN}`)
    }

    return this._channelARN
  }

  async getEndpointsByProtocol(){
    if(!this._endpointsByProtocol){
      // Get signaling channel endpoints

      const channelARN = await this.getChannelARN()

      const response = await this.kinesisVideoClient.getSignalingChannelEndpoint({
        ChannelARN: channelARN,
        SingleMasterChannelEndpointConfiguration: {
          Protocols: ['WSS', 'HTTPS'],
          Role: this.role,
        },
      }).promise()

      this._endpointsByProtocol = response.ResourceEndpointList.reduce((endpoints, endpoint) => {
        endpoints[endpoint.Protocol] = endpoint.ResourceEndpoint
        return endpoints
      }, {})
    }

    return this._endpointsByProtocol
  }

  async getSignalingClient(){
    if(!this._signalingClient){
      const {
        region,
        credentials,
        kinesisVideoClient,
        role,
        clientId
       } = this

       const channelARN = await this.getChannelARN()
       const endpointsByProtocol = await this.getEndpointsByProtocol()

       // Create Signaling Client
       this._signalingClient = new SignalingClient({
        channelARN: channelARN,
        channelEndpoint: endpointsByProtocol.WSS,
        clientId: clientId || this.getRandomClientId(),
        role: role,
        region: region,
        credentials: credentials,
        systemClockOffset: kinesisVideoClient.config.systemClockOffset,
      })
    }

    return this._signalingClient
  }

  async getIceServers(){
    if(!this._iceServers){
      this._iceServers = []
      if(!this.natTraversalDisabled && !this.forceTURN){
          this._iceServers.push({ urls: `stun:stun.kinesisvideo.${this.region}.amazonaws.com:443` })
      }

      const channelARN = await this.getChannelARN()
      const endpointsByProtocol = await this.getEndpointsByProtocol()

      // Get ICE server configuration
      const client = new AWS.KinesisVideoSignalingChannels({
        region: this.region,
        credentials: this.credentials,
        endpoint: endpointsByProtocol.HTTPS,
        correctClockSkew: true,
      })

      const response = await client.getIceServerConfig({
        ChannelARN: channelARN,
      }).promise()

      if(!this.natTraversalDisabled){
        response.IceServerList.forEach(iceServer =>
          this._iceServers.push({
            urls: iceServer.Uris,
            username: iceServer.Username,
            credential: iceServer.Password,
          }),
        )
      }
    }

    return this._iceServers
  }
}
