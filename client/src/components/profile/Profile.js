import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { debounce } from "lodash";
import {
  createRecord,
  fetchRecords,
  deleteRecord,
  updateRecord,
  searchRecords,
  searchRecordsByDate,
  fetchTree
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
      date: undefined, //new Date(2018, 1, 19), moment()._d, //Thu Jul 04 2019 22:44:10 GMT+0300 (Eastern European Summer Time)  - should be that format.
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    this.props.fetchRecords();
    this.props.fetchTree();
  }

  // onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  closeAlert = () => {
    this.setState({openAlert: false});
  };

  createRecord = (data) => {
    this.props.createRecord(data);
  };

  updateRecord = (data, id) => {
    // e.preventDefault();
    const {type, name, content, files, tags} = data;
    this.props.updateRecord({
      type, name, content, files, tags, _id: id
    });
  };

  deleteRecord = (id) => {
    // e.stopPropagation();
    this.props.deleteRecord(id);
  };

  searchRecords = debounce((searchRecords) => {
    this.setState({search: searchRecords});
    this.props.searchRecords({search: searchRecords});
  }, 1000);

  searchRecordsByDate = (date, {selected}) => {
    if (selected) {
      // Unselect the day if already selected:
      this.setState({date: undefined});
      this.props.fetchRecords();
      return;
    }
    this.setState({
      date: date
    });

    this.props.searchRecordsByDate(date);
  };

  render() {
    const { auth: {user}, records, tree } = this.props;
    const { openAlert, search, errors, date } = this.state;

    return (
      <div>
        {
          openAlert ?
          <div className="alert alert-dismissible alert-info">
            <button type="button" onClick={this.closeAlert} className="close" data-dismiss="alert">&times;</button>
            <h4><b>Hello, </b> <span className="text-warning">{user.name.split(" ")[0]}</span></h4>
          </div> : null
        }

        <Control
          onSearchRecords={this.searchRecords}
          onSearchRecordsByDate={this.searchRecordsByDate}
          onCreateRecord={this.createRecord}
          tree={tree}
          errors={errors}
          user={user}
          date={date}
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
  auth: PropTypes.object.isRequired,
  tree: PropTypes.array.isRequired
};

Profile.defaultProps = {
  createRecord: () => {},
  fetchRecords: () => {},
  deleteRecord: () => {},
  updateRecord: () => {},
  searchRecords: () => {},
  searchRecordsByDate: () => {},
  fetchTree: () => {},
  records: [],
  errors: {},
  auth: {},
  tree: []
};

const mapStateToProps = (store) => ({
  records: store.records,
  errors: store.errors,
  auth: store.auth,
  tree: store.tree
});

const	mapDispatchToProps = dispatch	=> ({
  createRecord: (record) => dispatch(createRecord(record)),
  fetchRecords: (data) => dispatch(fetchRecords(data)),
  deleteRecord: (id) => dispatch(deleteRecord(id)),
  updateRecord: (data, id) => dispatch(updateRecord(data, id)),
  searchRecords: (str) => dispatch(searchRecords(str)),
  searchRecordsByDate: (date) => dispatch(searchRecordsByDate(date)),
  fetchTree: (data) => dispatch(fetchTree(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
