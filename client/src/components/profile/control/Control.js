import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Modal, Dropdown } from 'react-bootstrap';
import classNames from "classnames";
// import isEmpty from "is-empty";
import localization from "../../localization/localization";
import DatePicker from "../../datePicker/DatePicker";
import CustomToggle from "./CustomToggle";
import Recorder from "../../audioRecorder/Recorder";
import Speech from "../../speechRecognition/Speech";
import TextEditor from "../../textEditor/TextEditor"
import { TypeAhead } from "../../typeAhead/TypeAhead";
import { FileUpload } from "../../fileUpload/FileUpload";

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: false, //text record
      audio: false, //audio Record
      voice: false, //voice Recognition
      name: '',
      content: '',
      files: [],
      tags: [],
      blob: {},
      recognition: '',
      date: undefined //new Date(2018, 1, 19), moment()._d, //Thu Jul 04 2019 22:44:10 GMT+0300 (Eastern European Summer Time)  - should be that format.
    };
  }

  handleInputChange = e => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  };

  handleDayPickerChange = (date, {selected}) => {
    if (selected) {
      // Unselect the day if already selected:
      this.setState({date: undefined});
      return;
    }
    this.setState({
      date: date
    });
  };

  handleToggleModal = (type, value) => {
    switch(type) {
      case 'text':
        this.setState({text: value});
        break;
      case 'audio':
        this.setState({audio: value});
        break;
      case 'voice':
        this.setState({voice: value});
        break;
      default:
        this.setState({text: false, audio: false, voice: false});
        break;
    }
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
    const {onSearchRecords, onCreateRecord, errors, user} = this.props;
    const {text, audio, voice, content, name, tags, files, date, blob, recognition} = this.state;

    return (
      <div>
        <Form className="text-left">
          <Row>
            <Col md={2}>
              <Form.Label className="mt-2">{localization.search_records}:</Form.Label>
            </Col>
            <Col md={7}>
              <Form.Control
                type="text"
                placeholder="Type something"
                className="mb-2"
                onChange={e => onSearchRecords(e.target.value)}
                name="search"/>
              <Form.Text className="text-muted">
                <p>Search by name</p>
              </Form.Text>
            </Col>

            <Col md={1}>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">test</Dropdown.Toggle>

                <Dropdown.Menu>
                  <DatePicker className="form-control" onDayPickerChange={(date, {selected}) => this.handleDayPickerChange(date, {selected})} date={date} />
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col md={2} className="text-right">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">Create</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.handleToggleModal('text', true)}>Text Record</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleToggleModal('audio', true)}>Audio Record</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleToggleModal('voice', true)}>Voice Recognition</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form>

        <Modal show={text} onHide={() => this.handleToggleModal('text', false)} size={'lg'}>
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
            <button className="btn btn-outline-danger" onClick={() => this.handleToggleModal('text', false)}>Close</button>
            <button className="btn btn-outline-success" onClick={() => {onCreateRecord({type: 'text', name, content, files, tags});}}>Save</button>
          </Modal.Footer>
        </Modal>

        <Modal show={audio} onHide={() => this.handleToggleModal('audio', false)} size={'lg'}>
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
            <button className="btn btn-outline-danger" onClick={() => this.handleToggleModal('audio', false)}>Close</button>
            <button className="btn btn-outline-success" onClick={() => {onCreateRecord({type: 'audio', name, blob, tags});}}>Save</button>
          </Modal.Footer>
        </Modal>

        <Modal show={voice} onHide={() => this.handleToggleModal('voice', false)} size={'lg'}>
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
            <button className="btn btn-outline-danger" onClick={() => this.handleToggleModal('voice', false)}>Close</button>
            <button className="btn btn-outline-success" onClick={() => {onCreateRecord({type: 'voice', name, recognition, tags});}}>Save</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

Control.propTypes = {
  onSearchRecords: PropTypes.func.isRequired,
  onCreateRecord: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

Control.defaultProps = {
  onSearchRecords: () => {},
  onCreateRecord: () => {},
  onChange: () => {},
  data: {},
  errors: {},
  user: {}
};

export default Control;
