import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { ReactMic } from 'react-mic';

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
    console.log('You can tap into the onStart callback');
  };

  onStop= (blobObject) => {
    console.log('recordedBlob is: ', blobObject);
    this.setState({ blobURL : blobObject.blobURL });
  };

  onData(recordedBlob){
    console.log('ONDATA CALL IS BEING CALLED! ', recordedBlob);
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
        <h1>Recorder</h1>
        <ReactMic
          className="oscilloscope"
          record={isRecording}
          pause={isPaused}
          backgroundColor="#FF4081"
          visualSetting="sinewave"
          audioBitsPerSecond= {128000}
          onStop={this.onStop}
          onStart={this.onStart}
          onSave={this.onSave}
          onData={this.onData}
          onBlock={this.onBlock} //Only available in React-Mic-Plus
          onPause={this.onPause} //Only available in React-Mic-Plus
          strokeColor="#000000" />
        <div>
          <audio ref="audioSource" controls="controls" src={blobURL} />
        </div>

        <Button
          variant="primary"
          onClick={this.startOrPauseRecording}>
          {/*{ (isRecording && !isPaused )? <PauseIcon /> : <MicrophoneOn /> }*/}
          { (isRecording && !isPaused )? "Pause" : "Start" }
        </Button>
        <Button
          variant="danger"
          disabled={!isRecording}
          onClick={this.stopRecording}
        >
          Stop
        </Button>
      </div>
    );
  }
}

Recorder.propTypes = {};

export default Recorder;