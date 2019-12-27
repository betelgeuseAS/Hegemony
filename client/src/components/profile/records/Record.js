import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { Card, Form, Modal } from "react-bootstrap";
import classNames from "classnames";
import { RecordContext } from "../Profile";

const Record = ({record}) => {
  const [showModal, setOpen] = useState(false);
  const [values, setValues] = useState({name: record.name, phone: record.phone, address: record.address});

  const {errors, onDeleteRecord, onUpdateRecord/*, user*/} = useContext(RecordContext);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  return (
    <>
      <Card style={{ width: '20rem' }} className="pt-1">
        <Card.Header>
          <button type="button" onClick={() => setOpen(true)} className="btn btn-outline-info" style={{position: "absolute", right: '0', top: '0'}}>
            <i className="fa fa-pencil" aria-hidden="true" />
          </button>
        </Card.Header>

        <Card.Body className="p-1">
          <Card.Title>{record.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{record.phone}</Card.Subtitle>
          <Card.Text>{record.address}</Card.Text>
        </Card.Body>

        <Card.Footer className="text-muted">
          <Card.Text>Created: {moment(record.createdAt).format('MMMM d YYYY, h:mm A')}</Card.Text>
          <Card.Text>Updated: {moment(record.updatedAt).format('MMMM d YYYY, h:mm A')}</Card.Text>
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={() => setOpen(false)} size={'lg'}>
        <Modal.Header closeButton>
          <Modal.Title>Update record</Modal.Title>
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
          <button className="btn btn-outline-danger" onClick={() => onDeleteRecord(record._id)}>Delete</button>
          <button className="btn btn-outline-success" onClick={() => onUpdateRecord(values, record._id)}>Update</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Record.propTypes = {
  deleteRecord: PropTypes.func.isRequired,
  updateRecord: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

Record.defaultProps = {
  deleteRecord: () => {},
  updateRecord: () => {},
  errors: {},
  auth: {}
};

export default Record;
