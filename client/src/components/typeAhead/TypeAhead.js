import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class TypeAhead extends Component {
  render() {
    return (
      <>
        <Typeahead
          clearButton
          onChange={(selected) => {
            console.log(selected)
          }}
          maxResults={5}
          multiple={true}
          options={[]}
          selected={[]}
          placeholder="Choose a state..."
          paginationText="Display additional results..."
          emptyLabel="'No matches found."
          maxHeight={'200px'}
        />
      </>
    );
  }
}

TypeAhead.propTypes = {};

export default TypeAhead;