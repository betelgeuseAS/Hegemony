import {
  FETCH_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
  SEARCH_RECORD } from '../constants/constants';

const initialState = [];

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_RECORDS:
      return action.payload;
    case CREATE_RECORD:
      return [...state, action.payload];
    case UPDATE_RECORD:
      return state.map(item => (
          item._id === action.payload._id ? { ...item, title: action.payload.title, content: action.payload.content } : item
        )
      );
    case DELETE_RECORD:
      return state.filter(({ _id }) => _id !== action.payload);
    case SEARCH_RECORD:
      return action.payload;
    default:
      return state;
  }
}