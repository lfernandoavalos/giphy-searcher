import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'normalize.css';

import store from './store/configureStore';

import App from './App';

// eslint-disable-next-line
__webpack_public_path__ = window.PUBLIC_PATH || process.env.PUBLIC_PATH || '/';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
