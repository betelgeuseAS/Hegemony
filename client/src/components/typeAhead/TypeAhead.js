import React from 'react';
import PropTypes from 'prop-types';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export const TypeAhead = ({ tags, selects, onSetTags }) => {
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
          onSetTags(populateData(selected));
        }}
        // Data
        labelKey={'label'}
        options={tags}
        selected={selects}
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
};

const populateData = items => {
  let result = [];
  items.forEach(item => {
    if (typeof item === 'object') {
      result.push(item.label);
    } else if (typeof item === 'string') {
      result.push(item);
    } else {
      return true;
    }
  });
  return result;
};

TypeAhead.propTypes = {
  onSetTags: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  selected: PropTypes.array
};

TypeAhead.defaultProps = {
  onSetTags: () => {},
  tags: [],
  selected: []
};