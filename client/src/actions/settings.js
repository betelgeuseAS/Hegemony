import axios from 'axios';

import {
  GET_ERRORS,
  UPDATE_USER } from "../constants/constants";

export const updateSettings = (data) => dispatch => {
  axios.put('/users/settings', data)
    .then(res => {
      dispatch({
        type: UPDATE_USER,
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
