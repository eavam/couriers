import React from 'react';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import 'antd/dist/antd.css';

import App from './App';
import rootReducer from './ducks';
import sagas from './sagas';
import registerServiceWorker from './registerServiceWorker';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(sagas);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
