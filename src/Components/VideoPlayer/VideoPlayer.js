import * as React from "react"
import styled from "styled-components"
import ReactPlayer from "react-player"
import VIDEO_ONE from '../../Assets/Videos/VIDEO_ONE.mp4'
import VIDEO_TWO from '../../Assets/Videos/VIDEO_TWO.mp4'
import VIDEO_THREE from '../../Assets/Videos/VIDEO_THREE.mp4'
import VIDEO_FOUR from '../../Assets/Videos/VIDEO_FOUR.mp4'
import { VideoName } from "../../Utility/helper";

const VideoPlayerWrapper = styled.div`
  width: 100%;
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

  getVideoUrl = (vidName) => {
    switch (vidName) {
      case VideoName.VIDEO_ONE: {
        return VIDEO_ONE;
      }
      case VideoName.VIDEO_TWO: {
        return VIDEO_TWO;
      }
      case VideoName.VIDEO_THREE: {
        return VIDEO_THREE;
      }
      case VideoName.VIDEO_FOUR: {
        return VIDEO_FOUR;
      }
      default: {
        return VIDEO_ONE;
      }
    }
  };

  playSound = (vidName) => {
    switch (vidName) {
      case VideoName.VIDEO_ONE: {
        return false;
      }
      case VideoName.VIDEO_TWO: {
        return true;
      }
      case VideoName.VIDEO_THREE: {
        return false
      }
      case VideoName.VIDEO_FOUR: {
        return true;
      }
      default: {
        return false;
      }
    }
  };

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
          url={this.getVideoUrl(this.props.videoUrl)}
          controls={true}
          style={{ height: "100vh" }}
          height={"100%"}
          width={"100%"}
          playing={this.props.autoPlay}
          muted={true}
          loop={false}
        />
      </VideoPlayerWrapper>
    )
  }
}

export default VideoPlayer
