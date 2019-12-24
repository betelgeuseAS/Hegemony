import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

import './Audio.sass';

import play from '../../img/media/play.svg';
import pause from '../../img/media/pause.svg';

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      play: false,
      currentTime: null,
      duration: null
    };
  }


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
    if (this.props.src !== prevProps.src) {
      this.player.src = this.props.src;
      this.setState({ ready: !this.state.ready, duration: this.player.duration });
    }

    if (this.state.play !== prevState.play) {
      this.state.play ? this.player.play() : this.player.pause();
    }

    this.player.addEventListener("ended", e => {
      this.player.currentTime = 0;
      this.setState({play: false});
    });
  }

  handleAudio = () => {
    this.setState({play: !this.state.play});

    // this.player.pause();
    // this.player.play();
  };

  handleChangeTime = (e) => {
    this.setState({currentTime: e.target.value});
    this.player.currentTime = e.target.value;
  };

  render() {
    const currentTime = getTime(this.state.currentTime);
    const duration = getTime(this.state.duration);

    console.log(this.state.currentTime);
    console.log(this.state.duration);
    return (
      <>
        <div className="medias">
          <div className="media-controls">
            <img
              src={this.state.play ? pause : play}
              alt="play/pause"
              onClick={this.handleAudio}
              className={classNames({'disabled': !this.state.ready})}
            />
          </div>

          <div className="media-time">
            <span className={classNames({'text-muted': !this.state.ready})}>{currentTime} / {duration}</span>
          </div>

          <div className="media-range">
            <input
              type="range"
              className="custom-range"
              disabled={!this.state.ready}
              min="0"
              max={this.state.duration ? this.state.duration : 0}
              value={this.state.currentTime ? this.state.currentTime : 0}
              onChange={(value) => this.handleChangeTime(value)}
            />
          </div>
        </div>

        <audio ref={ref => (this.player = ref)} />
      </>
    );
  }
}

Audio.propTypes = {
  src:PropTypes.string.isRequired
};

Audio.defaultProps = {
  src: ''
};

export default Audio;
