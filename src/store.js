/**
 * @fileoverview Creates and exports the redux store.
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import combinedReducer from './reducers';

const middleware = [thunk];

/**
 * The redux store that is created and exported.
 * @export
 */
const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
