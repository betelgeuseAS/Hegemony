import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { Card, Form, Modal } from "react-bootstrap";
import classNames from "classnames";
import { RecordContext } from "../Profile";
import "./Record.sass";
import {TypeAhead} from "../../typeAhead/TypeAhead";
import localization from "../../localization/localization";
import TextEditor from "../../textEditor/TextEditor";
import Gallery from '../../imageViewer/Gallery';
import CustomSpinner from '../../imageViewer/Spinner';

function makeUnsplashSrc (id) {
  return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`
}
function makeUnsplashSrcSet(id, size) {
  return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=${size} ${size}w`
}
function makeUnsplashThumbnail (id, orientation = 'landscape') {
  const dimensions = orientation === 'square' ?
    'w=300&h=300' :
    'w=240&h=159';

  return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=faces&fit=crop&${dimensions}`
}
const THEMED_IMAGES = [
  { id: '1506773090264-ac0b07293a64', caption: 'Photo by Dan Grinwis', orientation: 'square', useForDemo: true },
  { id: '1482398650355-d4c6462afa0e', caption: 'Photo by Andrew Neel', orientation: 'landscape', useForDemo: true },
  { id: '1514949823529-bdcc933a9339', caption: 'Photo by Kristopher Roller', orientation: 'landscape', useForDemo: true },
  { id: '1503293962593-47247718a17a', caption: 'Photo by Jeremy Bishop', orientation: 'landscape', useForDemo: true },
  { id: '1509914398892-963f53e6e2f1', caption: 'Photo by Linus Nylund', orientation: 'landscape', useForDemo: true },
];

const Record = ({record}) => {
  const [showModal, setOpen] = useState(false);
  const [values, setValues] = useState({name: record.name, content: record.content, tags: record.tags});

  const {errors, onDeleteRecord, onUpdateRecord, user} = useContext(RecordContext);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  const setTags = (tags) => {
    setValues({...values, tags});
  };

  const setTextEditor = (content) => {
    setValues({...values, content});
  };

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
        <button type="button" onClick={() => setOpen(true)} className="btn btn-outline-info" style={{position: "absolute", right: '0', top: '0'}}>
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

            {
              record.type === 'text'&&
              <>
                <Form.Group>
                  <Form.Label>{localization.what_your_mind}</Form.Label>
                  <TextEditor
                    initData={values.content}
                    onChangeContent={setTextEditor}
                  />
                  {errors.content === 'Content field is required' && (<div className="invalid-feedback">{localization.content_required}</div>)}
                  <Form.Text className="text-muted">{localization.not_forgotten_anything}</Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Files</Form.Label>
                  <Gallery
                    imgs={THEMED_IMAGES.map(({ caption, id, orientation, useForDemo }) => ({
                      src: makeUnsplashSrc(id),
                      thumbnail: makeUnsplashThumbnail(id, orientation),
                      srcSet: [
                        makeUnsplashSrcSet(id, 1024),
                        makeUnsplashSrcSet(id, 800),
                        makeUnsplashSrcSet(id, 500),
                        makeUnsplashSrcSet(id, 320),
                      ],
                      caption,
                      orientation,
                      useForDemo,
                    }))}
                    spinner={CustomSpinner}
                    spinnerColor={'#dc3545'}
                    spinnerSize={150}
                    showThumbnails
                  />
                </Form.Group>
              </>
            }

            {
              record.type === 'audio'&&
              <Form.Group>
                <Form.Label>Audio</Form.Label>
                <div className="audio-wrapper">
                  <audio controls="controls" src={'blobURL'} />
                </div>
              </Form.Group>
            }

            {
              record.type === 'voice'&&
              <Form.Group>
                <Form.Label>Voice</Form.Label>
                <Form.Text className="text-muted">
                  {
                    record.content || <span className="text-danger">No Data</span>
                  }
                </Form.Text>
              </Form.Group>
            }

            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <TypeAhead
                tags={user.tags}
                selects={values.tags}
                onSetTags={setTags}
              />
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
