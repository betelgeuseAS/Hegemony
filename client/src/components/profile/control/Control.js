import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, Dropdown, Button} from 'react-bootstrap';
// import isEmpty from "is-empty";
import localization from "../../localization/localization";
import DatePicker from "../../datePicker/DatePicker";
import CustomToggle from "./CustomToggle";
import ModalCreateRecord from "../modal/ModalCreateRecord";
import ModalTreeRecords from "../modal/ModalTreeRecords";

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: '',
    };
  }

  handleToggleModal = (modal) => {
    this.setState({modal});
  };

  render() {
    const {onSearchRecords, onCreateRecord, onSearchRecordsByDate, errors, user, tree: treeData, date} = this.props;
    const {modal} = this.state;

    return (
      <div className="control">
        <Form className="text-left">
          <Row>
            <Col md={8}>
              <Form.Label className="mt-2">{localization.search_records}:</Form.Label>

              <Form.Control
                type="text"
                placeholder="Type something"
                className="mb-2"
                onChange={e => onSearchRecords(e.target.value)}
                name="search"/>
              <Form.Text className="text-muted">
                <p>Search by name</p>
              </Form.Text>

              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">test</Dropdown.Toggle>

                <Dropdown.Menu>
                  <DatePicker className="form-control" onDayPickerChange={(date, {selected}) => onSearchRecordsByDate(date, {selected})} date={date} />
                </Dropdown.Menu>

                <Form.Text className="text-muted">
                  <p>Search by date</p>
                </Form.Text>
              </Dropdown>
            </Col>

            <Col md={4} className="text-left">
              <Form.Label className="mt-2">Control:</Form.Label>

              <Button className="btn btn-primary btn-block mb-3" onClick={() => this.handleToggleModal('tree')}>Tree</Button>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-block">Create</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.handleToggleModal('text')}>Text Record</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleToggleModal('audio')}>Audio Record</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.handleToggleModal('voice')}>Voice Recognition</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Form>

        <ModalCreateRecord
          user={user}
          modal={modal}
          errors={errors}
          onCreateRecord={onCreateRecord}
          onHandleToggleModal={this.handleToggleModal}
        />

        <ModalTreeRecords
          data={treeData}
          modal={modal}
          onHandleToggleModal={this.handleToggleModal}
        />
      </div>
    );
  }
}

Control.propTypes = {
  onSearchRecords: PropTypes.func.isRequired,
  onSearchRecordsByDate: PropTypes.func.isRequired,
  onCreateRecord: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  date: PropTypes.any
};

Control.defaultProps = {
  onSearchRecords: () => {},
  onSearchRecordsByDate: () => {},
  onCreateRecord: () => {},
  data: {},
  errors: {},
  user: {},
  date: undefined
};

export default Control;
