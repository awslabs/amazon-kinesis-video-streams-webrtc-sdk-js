import React from 'react'
import './App.css'
import './loader.css'
import ControlsForm from './ControlsForm'
import VideoContainer from './VideoContainer'
import { Auth } from 'aws-amplify'
import Master from './master'
import Viewer from './viewer'
import { withAuthenticator, AmplifyGreetings } from '@aws-amplify/ui-react'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      localViewSrcObject: '',
      remoteViewSrcObject: '',
      credentials: null
    }

    this.stopButtonHandler = this.stopButtonHandler.bind(this)
    this.startMasterHandler = this.startMasterHandler.bind(this)
    this.startViewerHandler = this.startViewerHandler.bind(this)

    this.master = new Master(this.setState.bind(this), this.onStatsReport.bind(this), this.onRemoteDataMessage.bind(this))
    this.viewer = new Viewer(this.setState.bind(this), this.onStatsReport.bind(this), this.onRemoteDataMessage.bind(this))
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.stopButtonHandler)

    window.addEventListener('unhandledrejection', e => {
        console.error(e.reason.toString());
        e.preventDefault();
    })

    window.addEventListener('error', e => {
        console.error(e.message);
        e.preventDefault();
    })

    Auth.currentCredentials().then(response => {
      this.setState({
        credentials: Auth.essentialCredentials(response)
      })
    })
  }

  componentWillUnmount() {
    this.stopButtonHandler()
  }

  onRemoteDataMessage(event){
    console.log(event.data);
  }

  onStatsReport(report) {
    // TODO: Publish stats
  }

  stopButtonHandler(){
    const { role } = this.state

    if(!role){
      return
    }

    if(role === 'master'){
      this.master.stop()
    }else if(role === 'viewer'){
      this.viewer.stop()
    }

    this.setState({role: null})
  }

  startMasterHandler(params) {
    this.master.start(this.state.credentials, params)
    this.setState({role: 'master'})
  }

  startViewerHandler(params) {
    this.viewer.start(this.state.credentials, params)
    this.setState({role: 'viewer'})
  }

  render() {
    return (
      <div className="App">
        <AmplifyGreetings />
        <div className="container mt-3">
          <h1>KVS WebRTC Test Page</h1>
          <p>This is the KVS Signaling Channel WebRTC test page. Use this page to connect to a signaling channel as either the MASTER or as a VIEWER.</p>

          <div id="main">
            <ControlsForm
              startMasterHandler={this.startMasterHandler}
              startViewerHandler={this.startViewerHandler} />
            <VideoContainer srcObject={this.state.localViewSrcObject} />
            <VideoContainer srcObject={this.state.remoteViewSrcObject} />
            <button type="button" className="btn btn-primary" onClick={this.stopButtonHandler}>
              Stop {this.state.role}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuthenticator(App, {usernameAlias: 'email'})
