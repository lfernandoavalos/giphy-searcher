import { createStore, applyMiddleware, combineReducers } from 'redux';

import { createDataLoaderMiddleware } from 'redux-dataloader';

import loaders from './loaders';
import logging from './middleware/logging';

// Reducers to include
import searchReducer from './../Modules/Main/redux/search.reducer';

// create middleware, you can add extra arguments to data loader context
const dataLoaderMiddleware = createDataLoaderMiddleware(loaders);

const createReducer = reducers =>
  combineReducers({
    /* Obs.:
     All non dynamic loaded reducers are declared directly here.
     If you don't have any, use the following "root" indentity reducer.
    */
    root: (state = null) => state,
    ...reducers,
  });


export const registerReducer = (store, name, reducer) => {
  // eslint-disable-next-line
  store.async[`${name}Reducer`] = reducer;
  store.replaceReducer(createReducer(store.async));
};

export default (() => {
  const middleware = [dataLoaderMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(logging);
  }

  const store = createStore(createReducer(), applyMiddleware(...middleware));
  store.async = {};

  // Register our init reducer
  registerReducer(store, 'search', searchReducer);

  return store;
})();
