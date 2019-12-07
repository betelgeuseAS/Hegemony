import React from 'react';
import PropTypes from 'prop-types';

import './Audio.sass';

const Audio = ({src}) => {
  return (
    <div className="audio">
      <audio controls="controls" src={src} />
    </div>
  );
};

Audio.propTypes = {
  onSearchRecords: PropTypes.string.isRequired
};

Audio.defaultProps = {
  src: ''
};

export default Audio;
