import thunk from	'redux-thunk';
import logger	from 'redux-logger';

import { createStore, applyMiddleware, compose} from 'redux';
import { rootReducer } from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));
