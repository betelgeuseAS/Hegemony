import {
  FETCH_RECORDS,
  CREATE_RECORD,
  UPDATE_RECORD,
  DELETE_RECORD,
  SEARCH_RECORD,
  FETCH_TREE } from '../constants/constants';

const initialState = [];
const initialStateTree = [];

export const record = (state = initialState, action) => {
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
};

export const tree = (state = initialStateTree, action) => {
  switch(action.type) {
    case FETCH_TREE:
      return action.payload;
    default:
      return state;
  }
};
