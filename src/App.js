import React from 'react';
import { Route } from 'react-router';

import AsyncComponent from './Components/AsyncComponent';

const main = () => import(/* webpackChunkName: "app" */ './Modules/Main/MainContainer.js');

const App = () => (
  <div>
    <Route exact path="/" component={() => <AsyncComponent moduleProvider={main} />} />
  </div>
);
export default App;
