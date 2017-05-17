
'use strict';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from 'reducers'

const loggerMiddleware = process.env.NODE_ENV == 'development' ? createLogger() : false

export default function configureStore(history, initialState) {

  const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    loggerMiddleware
  ].filter(Boolean)

  const store = createStore(
    combineReducers({
      rootReducer,
      routing: routerReducer
    }),
    initialState,
    applyMiddleware(
      ...middleware
    )
  );

  if(module.hot) {
    module.hot.accept('reducers', () => {
      const nextRootReducer = require('reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}