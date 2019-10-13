import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class TypeAhead extends Component {
  render() {
    return (
      <>
        <Typeahead
          // Functional
          id={'id'}
          clearButton
          allowNew={true}
          maxResults={5}
          multiple={true}
          // Event
          onChange={(selected) => {
            //If add new item: {customOption: true, id: "new-id-6", label: "value"}
            console.log(selected)
          }}
          // Data
          labelKey={'label'}
          options={[]}
          selected={[]}
          // Label
          placeholder="Choose a state..."
          paginationText="Display additional results..."
          emptyLabel="No matches found."
          newSelectionPrefix="New selection: "
          // Style
          maxHeight={'200px'}
          // Filter
          caseSensitive={false}
          ignoreDiacritics={true}
        />
      </>
    );
  }
}

TypeAhead.propTypes = {};

export default TypeAhead;