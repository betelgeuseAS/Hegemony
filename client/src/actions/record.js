import axios from 'axios';

import {
  FETCH_RECORDS,
  CREATE_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,
  SEARCH_RECORD,
  SEARCH_RECORD_BY_DATE,
  GET_ERRORS,
  FETCH_TREE} from "../constants/constants";

export const fetchRecords = () => dispatch => {
  axios.get(`/records/records`)
    .then(res => {
      dispatch({
        type: FETCH_RECORDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createRecord = (record) => dispatch => {
  axios.post('/records/record', record)
    .then(res => {
      dispatch({
        type: CREATE_RECORD,
        payload: record
      });

      fetchRecords();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updateRecord = (data) => dispatch => {
  axios.put(`/records/record/${data._id}`, data)
    .then(res => {
      dispatch({
        type: UPDATE_RECORD,
        payload: data
      });

      fetchRecords();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteRecord = (id) => dispatch => {
  axios.delete(`/records/record/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_RECORD,
        payload: id
      });

      fetchRecords();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const searchRecords = (data) => dispatch => {
  axios.post(`/records/search`, {search: data.search})
    .then(res => {
      dispatch({
        type: SEARCH_RECORD,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const searchRecordsByDate = (date) => dispatch => {
  axios.post(`/records/search/date`, {search: date})
    .then(res => {
      dispatch({
        type: SEARCH_RECORD_BY_DATE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const fetchTree = () => dispatch => {
  axios.get('/records/tree')
    .then(res => {
      dispatch({
        type: FETCH_TREE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
