import React from 'react';
import { Route } from 'react-router';

// React-toolbox components
import { Layout } from 'react-toolbox';

// General use giphy components
import AsyncComponent from './Components/AsyncComponent';
import AppContainer from './Components/Layout';
import Header from './Components/Header';

// Dynamic imported routes components
const main = () => import(/* webpackChunkName: "app" */ './Modules/Main/MainContainer.js');

const App = () => (
  <Layout>
    <AppContainer>
      <Header />
      <Route exact path="/" component={() => <AsyncComponent moduleProvider={main} />} />
    </AppContainer>
  </Layout>
);
export default App;
