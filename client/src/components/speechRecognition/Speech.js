import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Button } from 'react-bootstrap';
import SpeechRecognition from 'react-speech-recognition';

const options = {
  autoStart: false
};

class Speech extends Component {
  render() {
    const {
      transcript,
      interimTranscript,
      finalTranscript,
      resetTranscript,
      startListening,
      stopListening,
      abortListening,
      browserSupportsSpeechRecognition,
      listening,
      recognition
    } = this.props;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }
    // recognition.lang = 'en-US';

    return (
      <div>
        <h1>Recognition</h1>

        <Button variant="primary" onClick={startListening}>Start</Button>
        <Button variant="warning" onClick={stopListening}>Stop</Button>
        <Button variant="danger" onClick={abortListening }>Abort</Button>
        <Button variant="secondary" onClick={resetTranscript}>Reset</Button>

        <div>
          <span>Recognition: {listening ? 'Yes' : 'No'}</span><br/>
          <span>{transcript}</span><br/>
          <span>{interimTranscript}</span><br/>
          <span>{finalTranscript }</span>
        </div>
      </div>
    )
  }
}

Speech.propTypes = {
  transcript: PropTypes.string,
  interimTranscript: PropTypes.string,
  finalTranscript: PropTypes.string,
  resetTranscript: PropTypes.func,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  abortListening: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  listening: PropTypes.bool
};

export default SpeechRecognition(options)(Speech);