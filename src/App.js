import React from 'react';
import { Route } from 'react-router';

import AsyncComponent from './Components/AsyncComponent';

const search = () => import(/* webpackChunkName: "search" */ './Modules/Search/SearchContainer.js');
const gif = () => import(/* webpackChunkName: "gif" */ './Modules/GIF/GIFContainer.js');

const App = () => (
  <div>
    <Route exact path="/" component={() => <AsyncComponent moduleProvider={search} />} />
    <Route exact path="/search" component={() => <AsyncComponent moduleProvider={search} />} />
    <Route path="/gif/:id?" component={() => <AsyncComponent moduleProvider={gif} />} />
  </div>
);
export default App;
