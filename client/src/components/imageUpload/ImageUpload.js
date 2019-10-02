import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageUploader from 'react-images-upload';

class ImageUpload extends Component {

  constructor(props) {
    super(props);
    this.state = { pictures: [] };
  }

  onDrop = (picture) => {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
  };

  render() {
    return (
      <ImageUploader
        withIcon={true}
        withPreview={true}
        buttonText='Choose images'
        onChange={this.onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif', '.txt']}
        maxFileSize={5242880}
      />
    );
  }
}

ImageUpload.defaultProps = {
  className: '',
  fileContainerStyle: {},
  buttonClassName: "",
  buttonStyles: {},
  withPreview: false,
  accept: "image/*",
  name: "",
  withIcon: true,
  buttonText: "Choose images",
  buttonType: "button",
  withLabel: true,
  label: "Max file size: 5mb, accepted: jpg|gif|png",
  labelStyles: {},
  labelClass: "",
  imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
  maxFileSize: 5242880,
  fileSizeError: " file size is too big",
  fileTypeError: " is not a supported file extension",
  errorClass: "",
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: () => {},
  defaultImages: []
};

ImageUpload.propTypes = {
  style: PropTypes.object,
  fileContainerStyle: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  buttonClassName: PropTypes.string,
  buttonStyles: PropTypes.object,
  buttonType: PropTypes.string,
  withPreview: PropTypes.bool,
  accept: PropTypes.string,
  name: PropTypes.string,
  withIcon: PropTypes.bool,
  buttonText: PropTypes.string,
  withLabel: PropTypes.bool,
  label: PropTypes.string,
  labelStyles: PropTypes.object,
  labelClass: PropTypes.string,
  imgExtension: PropTypes.array,
  maxFileSize: PropTypes.number,
  fileSizeError: PropTypes.string,
  fileTypeError: PropTypes.string,
  errorClass: PropTypes.string,
  errorStyle: PropTypes.object,
  singleImage: PropTypes.bool,
  defaultImages: PropTypes.array
};

export default ImageUpload;