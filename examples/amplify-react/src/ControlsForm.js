import React from 'react';

class ControlsForm extends React.Component  {

  constructor(props) {
    super(props)

    this.state = {
      region: 'us-east-1',
      endpoint: '',
      channelName: '',
      clientId: '',
      sendVideo: false,
      sendAudio: false,
      openDataChannel: false,
      widescreen: true,
      fullscreen: false,
      natTraversalEnabled: true,
      forceTURN: false,
      natTraversalDisabled: false,
      useTrickleICE: true,
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.startMaster = this.startMaster.bind(this)
    this.startViewer = this.startViewer.bind(this)
    this.createChannel = this.createChannel.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  startMaster(event) {
    event.preventDefault()

    if(this.state.channelName === '' || !this.state.channelName){
      alert('Channel Name is required')
      return
    }

    this.props.startMasterHandler(this.state)
  }

  startViewer(event) {
    event.preventDefault()

    if(this.state.channelName === '' || !this.state.channelName){
      alert('Channel Name is required')
      return
    }

    this.props.startViewerHandler(this.state)
  }

  createChannel(event) {
    event.preventDefault()

    alert('Not Yet Implemented')
  }

  render() {
    return (
      <form>
          <h4>KVS Endpoint</h4>
          <div className="form-group">
              <label>Region</label>
              <input
                type="text"
                className="form-control"
                name="region"
                value={this.state.region}
                onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
              <label>Endpoint <small>(optional)</small></label>
              <input
                type="text"
                className="form-control"
                name="endpoint"
                placeholder="Endpoint"
                value={this.state.endpoint}
                onChange={this.handleInputChange} />
          </div>

          <h4>Signaling Channel</h4>
          <div className="form-group">
              <label>Channel Name</label>
              <input type="text"
                className="form-control"
                name="channelName"
                placeholder="Channel"
                value={this.state.channelName}
                onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
              <label>Client Id <small>(optional)</small></label>
              <input
                type="text"
                className="form-control"
                name="clientId"
                placeholder="Client id"
                value={this.state.clientId}
                onChange={this.handleInputChange} />
          </div>

          <h4>Tracks</h4>
          <p><small>Control which media types are transmitted to the remote client.</small></p>
          <div className="form-group">
              <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="sendVideo"
                    checked={this.state.sendVideo}
                    onChange={this.handleInputChange} />
                  <label className="form-check-label">Send Video</label>
              </div>
              <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="sendAudio"
                    checked={this.state.sendAudio}
                    onChange={this.handleInputChange} />
                  <label className="form-check-label">Send Audio</label>
              </div>
              <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="openDataChannel"
                    checked={this.state.dataChannel}
                    onChange={this.handleInputChange} />
                  <label className="form-check-label">Open DataChannel</label>
              </div>
          </div>

          <h4>Video Resolution</h4>
          <p><small>Set the desired video resolution and aspect ratio.</small></p>
          <div className="form-group">
              <div className="form-check form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="resolution"
                    value="widescreen"
                    checked={this.state.widescreen}
                    onChange={this.handleInputChange} />
                  <label className="form-check-label" htmlFor="widescreen">1280x720 <small>(16:9 widescreen)</small></label>
              </div>
              <div className="form-check form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="resolution"
                    value="fullscreen"
                    checked={this.state.fullscreen}
                    onChange={this.handleInputChange} />
                  <label className="form-check-label" htmlFor="fullscreen">640x480 <small>(4:3 fullscreen)</small></label>
              </div>
          </div>

          <h4>NAT Traversal</h4>
          <p><small>Control settings for ICE candidate generation.</small></p>
          <div className="form-group">
              <div className="form-check form-check">
                  <input
                    className="form-check-input"
                      type="radio"
                      name="natTraversal"
                      value="natTraversalEnabled"
                      checked={this.state.natTraversalEnabled}
                      onChange={this.handleInputChange} />
                  <label className="form-check-label" htmlFor="natTraversalEnabled">STUN/TURN</label>
              </div>
              <div className="form-check form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="natTraversal"
                    value="forceTURN"
                    checked={this.state.forceTURN}
                    onChange={this.handleInputChange} />
                  <label className="form-check-label" htmlFor="forceTURN">TURN Only <small>(force cloud relay)</small></label>
              </div>
              <div className="form-check form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="natTraversal"
                    value="natTraversalDisabled"
                    checked={this.state.natTraversalDisabled}
                    onChange={this.handleInputChange} />
                  <label className="form-check-label" htmlFor="natTraversalDisabled">Disabled</label>
              </div>
          </div>
          <div className="form-group">
              <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="useTrickleICE"
                    checked={this.state.useTrickleICE}
                    onChange={this.handleInputChange} />
                  <label className="form-check-label">Use trickle ICE <small>(not supported by Alexa devices)</small></label>
              </div>
          </div>
          <div>
              <button
                id="master-button"
                type="button"
                className="btn btn-primary"
                onClick={this.startMaster}>
                Start Master
              </button>
              <button
                id="viewer-button"
                type="button"
                className="btn btn-primary"
                onClick={this.startViewer}>
                Start Viewer
              </button>
              <button
                id="create-channel-button"
                type="button"
                className="btn btn-primary"
                onClick={this.createChannel}>
                Create Channel
              </button>
          </div>
      </form>
    )
  }
}

export default ControlsForm
