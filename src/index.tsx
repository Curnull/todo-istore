import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, combineReducers, compose } from 'redux';

 // импортируем редьюсер для редакс и функция которая скажет istore использовать redux как хранилище данных
import { dynamicStoreReducer, useReduxAsStore } from 'istore-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

declare var window: {
  __REDUX_DEVTOOLS_EXTENSION__: any
};

const reduxLogger = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ maxAge: 100 }) : (f: any) => f;

const store = createStore(
  combineReducers({
    dynamic: dynamicStoreReducer // добавляем в redux наш редьюсер
  }),
  compose(reduxLogger)
);

useReduxAsStore(store, 'dynamic'); // указываем что нужно использовать redux store вместо дефолтного хранилища istore
// обратите внимание что вторым параметром передается название по которому был добавлен dynamicStoreReducer редьюсер.
// По дефолту оно = dynamic но я решил тут это указать явно, что бы показать что не обязательно использовать название именно dynamic.

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
