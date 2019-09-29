import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Modal, Dropdown } from 'react-bootstrap';
import classNames from "classnames";
import isEmpty from "is-empty";

import localization from "../../localization/localization";

import DatePicker from "../../datePicker/DatePicker";
import CustomToggle from "./CustomToggle";

// const Control = ({onSearchRecords, onCreateRecord, errors, user}) => {
class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      address: '',
      phone: '',
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

  render() {
    const {onSearchRecords, onCreateRecord, errors, user} = this.props;
    const {open, name, address, phone} = this.state;
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
              <button type="button" onClick={() => this.setState({open: true})} className="btn btn-outline-info"><i className="fa fa-plus mr-1" aria-hidden="true" />Create</button>
            </Col>
          </Row>
        </Form>

        <Modal show={open} onHide={() => {this.setState({open: false});}} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Add new record</Modal.Title>
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
            <button className="btn btn-outline-danger" onClick={() => {this.setState({open: false});}}>Close</button>
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