import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import combinedReducer from './reducers';

const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware())
);

export default store;
