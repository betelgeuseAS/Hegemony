import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import {debounce} from "lodash";

import {
  createRecord,
  fetchRecords,
  deleteRecord,
  updateRecord,
  searchRecords
} from "../../actions/record";


import Control from "./control/Control";
import List from "./records/List";

export const RecordContext = React.createContext({});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlert: true,

      errors: {},

      search: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  fetchRecords = () => {
    axios.get(`/records/records`)
      .then(res => {
        this.props.fetchRecords(res.data);
      });
  };
  componentDidMount() {
    this.fetchRecords();
  }

  // onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  closeAlert = () => {
    this.setState({openAlert: false});
  };

  createRecord = (data) => {
    this.props.createRecord(data, this.fetchRecords);
  };

  updateRecord = (data, id) => {
    // e.preventDefault();
    const {name, phone, address} = data;
    this.props.updateRecord({
      name, phone, address, _id: id
    });

    this.fetchRecords();
  };

  deleteRecord = (id) => {
    // e.stopPropagation();
    this.props.deleteRecord(id);

    this.fetchRecords();
  };

  searchRecords = debounce((searchRecords) => {
    this.setState({search: searchRecords});
    this.props.searchRecords({search: searchRecords});
  }, 1000);

  render() {
    const { auth: {user}, records } = this.props;
    const { openAlert, search, errors } = this.state;
    return (
      <div>
        {
          openAlert ?
          <div className="alert alert-dismissible alert-info">
            <button type="button" onClick={this.closeAlert} className="close" data-dismiss="alert">&times;</button>
            <h4><b>Hello, </b> <span className="text-warning">{user.name.split(" ")[0]}</span></h4>
          </div> :
          false
        }

        <Control
          onSearchRecords={this.searchRecords}
          onCreateRecord={this.createRecord}
          errors={errors}
          user={user}
        />

        <RecordContext.Provider value={{
          onDeleteRecord: this.deleteRecord,
          onUpdateRecord: this.updateRecord,
          errors: errors,
          user: user
        }}>
          {
            !records.length && search.length ?
              <h2 className="text-danger">Nothing was found</h2> :
              <List
                records={records}
              />
          }
        </RecordContext.Provider>
      </div>
    );
  }
}

Profile.propTypes = {
  createRecord: PropTypes.func.isRequired,
  fetchRecords: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
  updateRecord: PropTypes.func.isRequired,
  searchRecords: PropTypes.func.isRequired,
  records: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

Profile.defaultProps = {
  createRecord: () => {},
  fetchRecords: () => {},
  deleteRecord: () => {},
  updateRecord: () => {},
  searchRecords: () => {},
  records: [],
  errors: {},
  auth: {}
};

const mapStateToProps = (store) => ({
  records: store.records,
  errors: store.errors,
  auth: store.auth
});

const	mapDispatchToProps = dispatch	=> ({
  createRecord: (record, func) => dispatch(createRecord(record, func)),
  fetchRecords: (data) => dispatch(fetchRecords(data)),
  deleteRecord: (id) => dispatch(deleteRecord(id)),
  updateRecord: (data, id) => dispatch(updateRecord(data, id)),
  searchRecords: (str) => dispatch(searchRecords(str))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Profile);