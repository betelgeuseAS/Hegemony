import React from 'react';
import PropTypes from 'prop-types';
import Record from "./Record";
import './List.sass';

const List = ({records}) => {
  return (
    <div className="mt-3">
      <ul className="list-records">
        {
          records.map(item => (
            <li className="list-records-item" key={item._id}>
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
