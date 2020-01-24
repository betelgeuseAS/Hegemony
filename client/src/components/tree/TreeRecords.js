import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tree from 'react-animated-tree';
import localization from '../localization/localization';

class TreeRecords extends Component {
  openRecord = (title, id) => {
    console.log(title, id);
  };

  render() {
    const {data} = this.props;

    return (
      <>
        {
          data.map(itemYear => (
            <Tree key={itemYear.year} content={itemYear.year} type="Year" open>
              {
                itemYear.months.map(itemMonth => (
                  <Tree key={itemMonth.month} content={itemMonth.month} type="Month">
                    {
                      itemMonth.days.map(itemDay => (
                        <Tree key={itemDay.day} content={itemDay.day} type="Day">
                          {
                            itemDay.records.map(itemRecord => (
                              <Tree key={itemRecord._id} content={<strong onClick={() => this.openRecord(itemRecord.name, itemRecord._id)} className="truncate">{itemRecord.name}</strong>} type="Record" />
                              // <Tree key={itemRecord._id} content={<strong onClick={() => this.openRecord(itemRecord.title, itemRecord._id)} className="truncate">{itemRecord.title}</strong>} type="Record" canHide onClick={(a) => console.log(a)} />
                            ))
                          }
                        </Tree>
                      ))
                    }
                  </Tree>
                ))
              }
            </Tree>
          ))
        }
      </>
    );
  }
}

TreeRecords.propTypes = {
  data: PropTypes.array.isRequired
};

TreeRecords.defaultProps = {
  data: []
};

export default TreeRecords;
