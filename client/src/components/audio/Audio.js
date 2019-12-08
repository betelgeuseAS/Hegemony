import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Audio.sass';

// const Audio = ({src}) => {
//   return (
//     <div className="audio">
//       <audio controls="controls" src={src} />
//       <audio controls="controls" src={'https://ia802908.us.archive.org/0/items/mythium/AC_TSOWAfucked_up.mp3'} />
//     </div>
//   );
// };

const campfireStory = "https://ia802908.us.archive.org/0/items/mythium/SSB12_28_03_T.mp3";
const bootingUp = "https://ia802908.us.archive.org/0/items/mythium/AC_TSOWAfucked_up.mp3";

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

class Audio extends Component {
  state = {
    selectedTrack: null,
    player: "stopped",
    currentTime: null,
    duration: null
  };

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "Campfire Story":
          track = campfireStory;
          break;
        case "Booting Up":
          track = bootingUp;
          break;
        default:
          break;
      }
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ selectedTrack: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }

  render() {
    const list = [
      { id: 1, title: "Campfire Story" },
      { id: 2, title: "Booting Up" }
    ].map(item => {
      return (
        <li
          key={item.id}
          onClick={() => this.setState({ selectedTrack: item.title })}
        >
          {item.title}
        </li>
      );
    });

    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);

    return (
      <>
        <ul>{list}</ul>
        <div>
          {this.state.player === "paused" && (
            <button onClick={() => this.setState({ player: "playing" })}>
              Play
            </button>
          )}
          {this.state.player === "playing" && (
            <button onClick={() => this.setState({ player: "paused" })}>
              Pause
            </button>
          )}
          {this.state.player === "playing" || this.state.player === "paused" ? (
            <button onClick={() => this.setState({ player: "stopped" })}>
              Stop
            </button>
          ) : (
            ""
          )}
        </div>
        {this.state.player === "playing" || this.state.player === "paused" ? (
          <div>
            {currentTime} / {duration}
          </div>
        ) : (
          ""
        )}
        <audio ref={ref => (this.player = ref)} />
      </>
    );
  }
}

// Audio.propTypes = {
//   onSearchRecords: PropTypes.string.isRequired
// };
//
// Audio.defaultProps = {
//   src: ''
// };

export default Audio;





// ES6 class properties syntax
// class Music extends React.Component {
//   state = {
//     play: false
//   }
//   audio = new Audio(this.props.url)
//
//   componentDidMount() {
//     audio.addEventListener('ended', () => this.setState({ play: false }));
//   }
//
//   componentWillUnmount() {
//     audio.removeEventListener('ended', () => this.setState({ play: false }));
//   }
//
//   togglePlay = () => {
//     this.setState({ play: !this.state.play }, () => {
//       this.state.play ? this.audio.play() : this.audio.pause();
//     });
//   }
//
//   render() {
//     return (
//       <div>
//         <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button>
//       </div>
//     );
//   }
// }
// export default Music;


// Hooks version (React 16.8+):
// import React, { useState, useEffect } from "react";
//
// const useAudio = url => {
//   const [audio] = useState(new Audio(url));
//   const [playing, setPlaying] = useState(false);
//
//   const toggle = () => setPlaying(!playing);
//
//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     },
//     [playing]
//   );
//
//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   }, []);
//
//   return [playing, toggle];
// };
//
// const Player = ({ url }) => {
//   const [playing, toggle] = useAudio(url);
//
//   return (
//     <div>
//       <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
//     </div>
//   );
// };
// export default Player;
