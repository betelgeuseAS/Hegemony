import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { ReactMic } from 'react-mic';
import './Recorder.sass';

export class Recorder extends Component {
  constructor(props){
    super(props);
    this.state = {
      blobObject: null,
      isRecording: false,
      isPaused: false
    }
  }

  startOrPauseRecording= () => {
    const { isPaused, isRecording } = this.state;

    if(isPaused) {
      this.setState({ isPaused: false })
    } else if(isRecording) {
      this.setState({ isPaused: true })
    } else {
      this.setState({ isRecording: true })
    }
  };

  stopRecording= () => {
    this.setState({ isRecording: false });
  };

  onSave=(blobObject) => {

  };

  onStart=() => {
    // console.log('You can tap into the onStart callback');
  };

  onStop= (blobObject) => {
    // console.log('recordedBlob is: ', blobObject);
    this.setState({ blobURL : blobObject.blobURL });

    this.props.onSetAudio(blobObject);
  };

  onData(recordedBlob){
    // console.log('ONDATA CALL IS BEING CALLED! ', recordedBlob);
  };

  onBlock() {
    alert('ya blocked me!')
  };

  onPause() {
    alert('ya paused it')
  };

  render() {
    const { blobURL, isRecording, isPaused } = this.state;

    return(
      <div>
        <ReactMic
          className="oscilloscope"
          record={isRecording}
          pause={isPaused}
          backgroundColor="#fff"
          visualSetting="sinewave"
          audioBitsPerSecond= {128000}
          onStop={this.onStop}
          onStart={this.onStart}
          onSave={this.onSave}
          onData={this.onData}
          onBlock={this.onBlock} //Only available in React-Mic-Plus
          onPause={this.onPause} //Only available in React-Mic-Plus
          strokeColor="#000000" />

        <Button
          variant="primary"
          onClick={this.startOrPauseRecording}>
          {/*{ (isRecording && !isPaused )? <PauseIcon /> : <MicrophoneOn /> }*/}
          { (isRecording && !isPaused )? "Pause recording" : "Make a record" }</Button>
        <Button
          variant="danger"
          disabled={!isRecording}
          onClick={this.stopRecording}>Stop recording</Button>

        {/*<Audio src={blobURL} />*/}
        <div className="audio-wrapper">
          <audio controls="controls" src={blobURL} />
        </div>
      </div>
    );
  }
}

Recorder.propTypes = {
  onSetAudio: PropTypes.func.isRequired
};

Recorder.defaultProps = {
  onSetAudio: () => {}
};

export default Recorder;
