import * as React from "react"
import styled from "styled-components"
import ReactPlayer from "react-player"

const VideoPlayerWrapper = styled.div`
  width: 70%;
    /* width: ${props => (props.fullScreen ? `100vw !important` : "auto")}; */
`

class VideoPlayer extends React.Component {
  render() {
    return (
      <VideoPlayerWrapper>
        <ReactPlayer
          url={this.props.videoUrl}
          controls={true}
          style={{ height: "100vh" }}
          height={"100%"}
          width={"100%"}
          playing={this.props.autoPlay}
          muted={!this.props.autoPlay}
        />
      </VideoPlayerWrapper>
    )
  }
}

export default VideoPlayer
