import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Modal, Dropdown } from 'react-bootstrap';
import classNames from "classnames";
import isEmpty from "is-empty";

import localization from "../../localization/localization";

import DatePicker from "../../datePicker/DatePicker";
import CustomToggle from "./CustomToggle";
import Recorder from "../../audioRecorder/Recorder";
import Speech from "../../speechRecognition/Speech";

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //complete record:
      complete: false,
      name: '',
      address: '',
      phone: '',

      //audio Record
      audio: false,

      //voice Recognition
      voice: false,


      birthday: undefined //new Date(2018, 1, 19), moment()._d, //Thu Jul 04 2019 22:44:10 GMT+0300 (Eastern European Summer Time)  - should be that format.
    };
  }

  handleInputChange = e => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  };

  //DatePicker:
  handleDayPickerChange = (date, {selected}) => {
    if (selected) {
      // Unselect the day if already selected:
      this.setState({birthday: undefined});
      return;
    }
    this.setState({
      birthday: date
    });
  };

  handleToggleModal = (type, value) => {
    switch(type) {
      case 'complete':
        this.setState({complete: value});
        break;
      case 'audio':
        this.setState({audio: value});
        break;
      case 'voice':
        this.setState({voice: value});
        break;
      default:
        this.setState({complete: false, audio: false, voice: false});
        break;
    }
  };

  render() {
    const {onSearchRecords, onCreateRecord, errors, user} = this.props;
    const {complete, audio, voice, name, address, phone} = this.state;
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
                  <DatePicker className="form-control" onDayPickerChange={(date, {selected}) => this.handleDayPickerChange(date, {selected})} date={this.state.birthday} />
                </Dropdown.Menu>
              </Dropdown>
            </Col>

            <Col md={2} className="text-right">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <i className="fa fa-plus mr-1" aria-hidden="true" />Create
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.handleToggleModal('complete', true)}>Complete Record</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleToggleModal('audio', true)}>Audio Record</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleToggleModal('voice', true)}>Voice Recognition</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form>

        <Modal show={complete} onHide={() => this.handleToggleModal('complete', false)} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Add new <strong className="text-warning">Complete Record</strong></Modal.Title>
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
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  onChange={this.handleInputChange}
                  value={phone}
                  name="phone"
                  className={classNames("", {
                    'is-invalid': errors.phone
                  })}/>
                <span className="invalid-feedback">{errors.phone}</span>
              </Form.Group>

              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  onChange={this.handleInputChange}
                  value={address}
                  name="address"
                  className={classNames("", {
                    'is-invalid': errors.address
                  })}/>
                <span className="invalid-feedback">{errors.address}</span>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline-danger" onClick={() => this.handleToggleModal('complete', false)}>Close</button>
            <button className="btn btn-outline-success" onClick={() => {onCreateRecord({name, address});}}>Save</button>
          </Modal.Footer>
        </Modal>

        <Modal show={audio} onHide={() => this.handleToggleModal('audio', false)} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Add new <strong className="text-warning">Audio Record</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Recorder />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline-danger" onClick={() => this.handleToggleModal('audio', false)}>Close</button>
            <button className="btn btn-outline-success" onClick={() => {onCreateRecord({name, address});}}>Save</button>
          </Modal.Footer>
        </Modal>

        <Modal show={voice} onHide={() => this.handleToggleModal('voice', false)} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Add new <strong className="text-warning">Voice Recognition</strong></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Speech />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline-danger" onClick={() => this.handleToggleModal('voice', false)}>Close</button>
            <button className="btn btn-outline-success" onClick={() => {onCreateRecord({name, address});}}>Save</button>
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