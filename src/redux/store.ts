import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root.reducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default store;
