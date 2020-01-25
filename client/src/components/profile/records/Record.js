import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { Card } from "react-bootstrap";
import classNames from "classnames";
import { RecordContext } from "../Profile";
import "./Record.sass";
import ModalUpdateRecord from '../modal/ModalUpdateRecord';

const Record = ({record}) => {
  const [modal, handleToggleModal] = useState('');

  const {errors, onDeleteRecord, onUpdateRecord, user} = useContext(RecordContext);

  return (
    <>
      <Card
        style={{ width: '20rem' }}
        className={classNames(
          'record-item pt-1',
          {
            'text-association': record.type === 'text',
            'audio-association': record.type === 'audio',
            'voice-association': record.type === 'voice'
          }
        )}
      >
        {/*<Card.Header></Card.Header>*/}
        <button type="button" onClick={() => handleToggleModal('tree')} className="btn btn-outline-info" style={{position: "absolute", right: '0', top: '0'}}>
          <i className="fa fa-info" aria-hidden="true" />
        </button>

        <Card.Body className="p-1">
          <Card.Title className="cut-text pr-5" title={record.name}>{record.name}</Card.Title>
          {/*<Card.Subtitle className="mb-2 text-muted">{}</Card.Subtitle>*/}
        </Card.Body>

        <Card.Footer className="text-muted">
          <Card.Text>Created: <span className="record-date">{moment(record.createdAt).format('MMMM d YYYY, h:mm A')}</span></Card.Text>
          <Card.Text>Updated: <span className="record-date">{moment(record.updatedAt).format('MMMM d YYYY, h:mm A')}</span></Card.Text>
        </Card.Footer>
      </Card>

      <ModalUpdateRecord
        user={user}
        modal={modal}
        errors={errors}
        record={record}
        onDeleteRecord={onDeleteRecord}
        onUpdateRecord={onUpdateRecord}
        onHandleToggleModal={handleToggleModal}
      />
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
