import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './rootReducer';
import initialState from './initialState';
import App from './components/App';

/* eslint no-undef: off */
const middleware = [promiseMiddleware(), thunk];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
