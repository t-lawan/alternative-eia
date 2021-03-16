import * as React from "react"
import styled from "styled-components"
import ReactPlayer from "react-player"
import VIDEO_ONE from '../../Assets/Videos/VIDEO_ONE.mp4'
import VIDEO_TWO from '../../Assets/Videos/VIDEO_TWO.mp4'
import VIDEO_THREE from '../../Assets/Videos/VIDEO_THREE.mp4'
import VIDEO_FOUR from '../../Assets/Videos/VIDEO_FOUR.mp4'

const VideoPlayerWrapper = styled.div`
  width: 70%;
    /* width: ${props => (props.fullScreen ? `100vw !important` : "auto")}; */
`

class VideoPlayer extends React.Component {
  state = {
    index: 0
  }
  videos = [
    VIDEO_ONE,
    VIDEO_TWO,
    VIDEO_THREE,
    VIDEO_FOUR
  ]

  videoEnded = () => {
    let index = this.state.index;
    index++;
    if(index + 1 > this.videos.length) {
      index  = 0;
    } 

    this.setState({
      index: index
    })
  }
  render() {
    return (
      <VideoPlayerWrapper>
        <ReactPlayer
          url={this.videos[this.state.index]}
          controls={true}
          style={{ height: "100vh" }}
          height={"100%"}
          width={"100%"}
          playing={this.props.autoPlay}
          muted={false}
          loop={false}
          onEnded={() => this.videoEnded()}
        />
      </VideoPlayerWrapper>
    )
  }
}

export default VideoPlayer
