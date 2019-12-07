import React from 'react';
import PropTypes from 'prop-types';

import Record from "./Record";

const List = ({records}) => {
  return (
    <div className="mt-3">
      <ul style={{listStyleType: 'none', margin: '0', padding: 0}}>
        {
          records.map(item => (
            <li style={{display: 'inline-block', margin: '7px 10px 7px 10px'}} key={item._id}>
              <Record record={item} />
            </li>
          ))
        }
      </ul>
    </div>
  );
};

List.propTypes = {
  records: PropTypes.array.isRequired
};

List.defaultProps = {
  records: []
};

export default List;
