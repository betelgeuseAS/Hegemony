import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Modal } from 'react-bootstrap';
import classNames from "classnames";
import isEmpty from "is-empty";

import localization from "../localization/localization";

const Control = ({onSearchRecords, onCreateRecord, errors, user}) => {
  const [showModal, setOpen] = useState(false);
  const [values, setValues] = useState({name: '', phone: '', address: ''});

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  return (
    <div>
      <Form className="text-left">
        <Row>
          <Col md={1}>
            <Form.Label className="mt-2">{localization.search_records}:</Form.Label>
          </Col>
          <Col md={9}>
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

          <Col md={2} className="text-right">
            <button type="button" onClick={() => setOpen(true)} className="btn btn-outline-info"><i className="fa fa-plus mr-1" aria-hidden="true" />Create</button>
          </Col>
        </Row>
      </Form>

      <Modal show={showModal} onHide={() => {setOpen(false); setValues({name: '', phone: '', address: ''});}} size={'lg'}>
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
                onChange={handleInputChange}
                value={values.name}
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
                onChange={handleInputChange}
                value={values.phone}
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
                onChange={handleInputChange}
                value={values.address}
                name="address"
                className={classNames("", {
                  'is-invalid': errors.address
                })}/>
              <span className="invalid-feedback">{errors.address}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-danger" onClick={() => {setOpen(false); setValues({name: '', phone: '', address: ''});}}>Close</button>
          <button className="btn btn-outline-success" onClick={() => {onCreateRecord(values); if(isEmpty(errors)) setValues({name: '', phone: '', address: ''});}}>Save</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

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
