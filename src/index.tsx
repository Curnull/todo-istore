import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, compose } from 'redux';
import { dynamicStoreReducer, useReduxAsStore } from 'istore-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

declare var window: {
  __REDUX_DEVTOOLS_EXTENSION__: any
};

const reduxLogger = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 100 }) : (f: any) => f;

const store = createStore(
  combineReducers({
    dynamic: dynamicStoreReducer
  }),
  compose(reduxLogger)
);

useReduxAsStore(store);

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
