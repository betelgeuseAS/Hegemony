import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal } from "react-bootstrap";
import classNames from "classnames";
import localization from "../../localization/localization";
import TextEditor from "../../textEditor/TextEditor";
import { FileUpload } from "../../fileUpload/FileUpload";
import { TypeAhead } from "../../typeAhead/TypeAhead";
import Recorder from "../../audioRecorder/Recorder";
import Speech from "../../speechRecognition/Speech";

class ModalCreateRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      content: '',
      files: [],
      tags: [],
      blob: {},
      recognition: '',
    };
  }

  handleInputChange = e => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  };

  setTextEditor = (data) => {
    this.setState({content: data});
  };

  setTags = (tags) => {
    this.setState({tags});
  };

  setFiles = (files) => {
    this.setState({files});
  };

  setAudio = (blob) => {
    this.setState({blob});
  };

  setVoice = (recognition) => {
    this.setState({recognition});
  };

  render() {
    const {user, modal, errors, onCreateRecord, onHandleToggleModal} = this.props;
    const {content, name, tags, files, blob, recognition} = this.state;

    return (
      <>
        <Modal show={modal === 'text'} onHide={() => onHandleToggleModal('')} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Add new <strong className="text-warning">Text Record</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={this.handleInputChange}
                  value={name}
                  name="name"
                  className={classNames("", {
                    'is-invalid': errors.name
                  })}/>
                <span className="invalid-feedback">{errors.name}</span>
              </Form.Group>

              <Form.Group>
                <Form.Label>{localization.what_your_mind}</Form.Label>
                <TextEditor onChangeContent={(data) => this.setTextEditor(data)} />
                {errors.content === 'Content field is required' && (<div className="invalid-feedback">{localization.content_required}</div>)}
                <Form.Text className="text-muted">{localization.not_forgotten_anything}</Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Files</Form.Label>
                <FileUpload
                  files={files}
                  onSetFiles={this.setFiles}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <TypeAhead
                  tags={user.tags}
                  selects={tags}
                  onSetTags={this.setTags}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-outline-danger" onClick={() => onHandleToggleModal('')}>Close</button>
            <button className="btn btn-outline-success" onClick={() => {onCreateRecord({type: 'text', name, content, files, tags});}}>Save</button>
          </Modal.Footer>
        </Modal>

        <Modal show={modal === 'audio'} onHide={() => onHandleToggleModal('')} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Add new <strong className="text-warning">Audio Record</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={this.handleInputChange}
                  value={name}
                  name="name"
                  className={classNames("", {
                    'is-invalid': errors.name
                  })}/>
                <span className="invalid-feedback">{errors.name}</span>
              </Form.Group>

              <Form.Group>
                <Form.Label>Record</Form.Label>
                <Recorder
                  onSetAudio={this.setAudio}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <TypeAhead
                  tags={user.tags}
                  selects={tags}
                  onSetTags={this.setTags}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline-danger" onClick={() => onHandleToggleModal('')}>Close</button>
            <button className="btn btn-outline-success" onClick={() => {onCreateRecord({type: 'audio', name, blob, tags});}}>Save</button>
          </Modal.Footer>
        </Modal>

        <Modal show={modal === 'voice'} onHide={() => onHandleToggleModal('')} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Add new <strong className="text-warning">Voice Recognition</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={this.handleInputChange}
                  value={name}
                  name="name"
                  className={classNames("", {
                    'is-invalid': errors.name
                  })}/>
                <span className="invalid-feedback">{errors.name}</span>
              </Form.Group>

              <Form.Group>
                <Form.Label>Recognition</Form.Label>
                <Speech
                  onSetVoice={this.setVoice}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <TypeAhead
                  tags={user.tags}
                  selects={tags}
                  onSetTags={this.setTags}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline-danger" onClick={() => onHandleToggleModal('')}>Close</button>
            <button className="btn btn-outline-success" onClick={() => {onCreateRecord({type: 'voice', name, recognition, tags});}}>Save</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

ModalCreateRecord.propTypes = {
  modal: PropTypes.string.isRequired
};

ModalCreateRecord.defaultProps = {
  modal: ''
};

export default ModalCreateRecord;
