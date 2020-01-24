import { combineReducers } from 'redux';

import errorReducer from './error';
import authReducer from './auth';
import { record, tree } from './record'; // import recordReducer from './record';

export const rootReducer	=	combineReducers({
  errors: errorReducer,
  auth: authReducer,
  records: record,
  tree: tree
});
