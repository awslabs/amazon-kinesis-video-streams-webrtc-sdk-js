import React from 'react'

class VideoContainer extends React.Component {

  constructor(props){
    super(props)

    this.videoRef = React.createRef()
  }

  componentDidUpdate() {
    this.updateVideoStream()
  }

  updateVideoStream(){
    const stream = this.props.srcObject

    if(typeof stream !== 'undefined' && stream instanceof MediaStream && this.videoRef.current.srcObject !== stream){
      this.videoRef.current.srcObject = stream
    }
  }

  render(){
    return (
      <div className="video-container">
        <video className="remote-view"
          autoPlay
          playsInline
          controls
          ref={this.videoRef}
        />
      </div>
    )
  }
}

export default VideoContainer
