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
      date: undefined, //new Date(2018, 1, 19), moment()._d, //Thu Jul 04 2019 22:44:10 GMT+0300 (Eastern European Summer Time)  - should be that format.
    };
  }

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

  handleToggleModal = (modal) => {
    this.setState({modal});
  };

  render() {
    const {onSearchRecords, onCreateRecord, errors, user, tree: treeData} = this.props;
    const {date, modal} = this.state;

    return (
      <div>
        <Form className="text-left">
          <Row>
            <Col md={2}>
              <Form.Label className="mt-2">{localization.search_records}:</Form.Label>
            </Col>
            <Col md={6}>
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

            <Col md={1}>
              <Button className="btn btn-primary" onClick={() => this.handleToggleModal('tree')}>Tree</Button>
            </Col>

            <Col md={2} className="text-right">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">Create</Dropdown.Toggle>

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
  onCreateRecord: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

Control.defaultProps = {
  onSearchRecords: () => {},
  onCreateRecord: () => {},
  data: {},
  errors: {},
  user: {}
};

export default Control;
