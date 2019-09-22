import axios from 'axios';

import {
  FETCH_RECORDS,
  CREATE_RECORD,
  DELETE_RECORD,
  UPDATE_RECORD,
  SEARCH_RECORD,
  GET_ERRORS} from "../constants/constants";

export const fetchRecords = data => {
  return {
    type: FETCH_RECORDS,
    payload: data
  }
};

export const createRecord = (record, reFetchRecords) => dispatch => {
  axios.post('/records/record', record)
    .then(res => {
      dispatch({
        type: CREATE_RECORD,
        payload: record
      });

      reFetchRecords();
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
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
    });
};