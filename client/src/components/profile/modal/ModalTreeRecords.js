import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from "react-bootstrap";
import TreeRecords from "../../tree/TreeRecords";

class ModalTreeRecords extends Component {
  render() {
    const {modal, data, onHandleToggleModal} = this.props;

    return (
      <>
        <Modal show={modal === 'tree'} onHide={() => onHandleToggleModal('')} size={'lg'}>
          <Modal.Header closeButton>
            <Modal.Title>Tree Records</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TreeRecords data={data} />
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-outline-danger" onClick={() => onHandleToggleModal('')}>Close</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

ModalTreeRecords.propTypes = {
  data: PropTypes.object.isRequired,
  modal: PropTypes.string.isRequired
};

ModalTreeRecords.defaultProps = {
  data: {},
  modal: ''
};

export default ModalTreeRecords;
