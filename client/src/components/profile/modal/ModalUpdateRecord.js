import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal } from "react-bootstrap";
import classNames from "classnames";
import localization from "../../localization/localization";
import TextEditor from "../../textEditor/TextEditor";
import Gallery from "../../imageViewer/Gallery";
import CustomSpinner from "../../imageViewer/Spinner";
import { TypeAhead } from "../../typeAhead/TypeAhead";

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
  { id: '1579502777928-14f9cad62132', caption: 'Photo by Dan Grinwis', orientation: 'square', useForDemo: true },
  { id: '1520262494112-9fe481d36ec3', caption: 'Photo by Andrew Neel', orientation: 'landscape', useForDemo: true },
  { id: '1564585530977-a99e9ff883fe', caption: 'Photo by Kristopher Roller', orientation: 'landscape', useForDemo: true },
  { id: '1563940105-cb89841d3b15', caption: 'Photo by Jeremy Bishop', orientation: 'landscape', useForDemo: true },
  { id: '1550056486-8ded219fb769', caption: 'Photo by Linus Nylund', orientation: 'landscape', useForDemo: true },
];

const ModalUpdateRecord = ({user, modal, errors, record, onDeleteRecord, onUpdateRecord, onHandleToggleModal}) => {
  const [values, setValues] = useState({name: record.name, content: record.content, tags: record.tags});

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
      <Modal show={modal === 'tree'} onHide={() => onHandleToggleModal('')} size={'lg'}>
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
  )
};

ModalUpdateRecord.propTypes = {
  user: PropTypes.object.isRequired,
  modal: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  record: PropTypes.object.isRequired,
  onDeleteRecord: PropTypes.func.isRequired,
  onUpdateRecord: PropTypes.func.isRequired,
  onHandleToggleModal: PropTypes.func.isRequired
};

ModalUpdateRecord.defaultProps = {
  user: {},
  modal: '',
  errors: {},
  record: {},
  onDeleteRecord: () => {},
  onUpdateRecord: () => {},
  onHandleToggleModal: () => {}
};

export default ModalUpdateRecord;
