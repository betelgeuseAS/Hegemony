import React, { Component } from 'react';
import ImgsViewer from 'react-images-viewer';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite/no-important';

const gutter = {
  small: 2,
  large: 4,
};

const classes = StyleSheet.create({
  gallery: {
    marginRight: -gutter.small,
    overflow: 'hidden',
    '@media (min-width: 500px)': {
      marginRight: -gutter.large,
    }
  },

  // anchor
  thumbnail: {
    boxSizing: 'border-box',
    display: 'block',
    float: 'left',
    lineHeight: 0,
    paddingRight: gutter.small,
    paddingBottom: gutter.small,
    overflow: 'hidden',

    '@media (min-width: 500px)': {
      paddingRight: gutter.large,
      paddingBottom: gutter.large,
    }
  },

  // orientation
  landscape: {
    width: '30%',
  },
  square: {
    paddingBottom: gutter.large,
    width: '40%',

    '@media (min-width: 500px)': {
      paddingBottom: gutter.large,
    }
  },

  // actual <img />
  source: {
    border: 0,
    display: 'block',
    height: 'auto',
    maxWidth: '100%',
    width: 'auto'
  },
});

const theme = {
  // container
  container: {
    background: 'rgba(255, 255, 255, .9)'
  },

  // arrows
  arrow: {
    backgroundColor: 'rgba(255, 255, 255, .8)',
    fill: '#222',
    opacity: .6,
    transition: 'opacity 200ms',

    ':hover': {
      opacity: 1,
    }
  },
  arrow__size__medium: {
    borderRadius: 40,
    height: 40,
    marginTop: -20,

    '@media (min-width: 768px)': {
      height: 70,
      padding: 15,
    }
  },
  arrow__direction__left: { marginLeft: 10 },
  arrow__direction__right: { marginRight: 10 },
  close: {
    fill: '#d40000',
    opacity: .6,
    transition: 'all 200ms',
    ':hover': {
      opacity: 1
    }
  },

  // footer
  footer: {
    color: '#000'
  },
  footerCount: {
    color: 'rgba(0, 0, 0, .6)'
  },

  // thumbnails
  thumbnail:{

  },
  thumbnail__active: {
    boxShadow: '0 0 0 2px #00d8ff'
  }
};

class Gallery extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isOpen: false,
      currImg: 0,
    };
  }

  openImgsViewer = (index, event) => {
    event.preventDefault();
    this.setState({
      currImg: index,
      isOpen: true,
    });
  };

  closeImgsViewer = () => {
    this.setState({
      currImg: 0,
      isOpen: false,
    });
  };

  gotoPrev = () => {
    this.setState({
      currImg: this.state.currImg - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currImg: this.state.currImg + 1
    });
  };

  gotoImg = (index) => {
    this.setState({
      currImg: index
    });
  };

  handleClickImg = () => {
    if (this.state.currImg === this.props.imgs.length - 1) return;
    this.gotoNext();
  };

  renderGallery = () => {
    const { imgs } = this.props;

    if (!imgs) return;

    const gallery = imgs.filter(i => i.useForDemo).map((obj, i) => {
      return (
        <a
          href={obj.src}
          className={css(classes.thumbnail, classes[obj.orientation])}
          key={i}
          onClick={(e) => this.openImgsViewer(i, e)}
        >
          <img src={obj.thumbnail} className={css(classes.source)} />
        </a>
      )
    });

    return (
      <div className={css(classes.gallery)}>
        {gallery}
      </div>
    );
  };

  render () {
    return (
      <div>
        {this.props.heading && <h2>{this.props.heading}</h2>}
        {this.props.subheading && <p>{this.props.subheading}</p>}
        {this.renderGallery()}
        <ImgsViewer
          backdropCloseable
          closeBtnTitle="Close"
          enableKeyboardInput
          currImg={this.state.currImg}
          imgs={this.props.imgs} //Imgs Object: {src: str (required), srcSet: arr of str or str (optional), caption: str (optional), alt: str (optional)}
          imgCountSeparator="/"
          isOpen={this.state.isOpen}
          leftArrowTitle="Left"
          rightArrowTitle="Right"
          onClickImg={this.handleClickImg}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrev}
          onClickThumbnail={this.gotoImg}
          onClose={this.closeImgsViewer}
          preloadNextImg
          showCloseBtn
          showImgCount
          preventAutoScroll
          preventScroll={this.props.preventScroll}
          showThumbnails={this.props.showThumbnails}
          spinner={this.props.spinner}
          spinnerColor={this.props.spinnerColor}
          spinnerSize={this.props.spinnerSize}
          theme={theme}
          width={1024}
        />
      </div>
    )
  }
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
  preventScroll: PropTypes.bool,
  spinner: PropTypes.func,
  spinnerColor: PropTypes.string,
  spinnerSize: PropTypes.number,
  heading: PropTypes.string,
  imgs: PropTypes.array,
  showThumbnails: PropTypes.bool,
  subheading: PropTypes.string,
};

Gallery.defaultProps = {
  preventScroll: true,
  spinner: () => {},
  spinnerColor: '',
  spinnerSize: 0,
  heading: '',
  imgs: [],
  showThumbnails: true,
  subheading: '',
};

export default Gallery
