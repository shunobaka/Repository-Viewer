import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Landing from './components/layout/Landing';
import Routes from './components/routes/Routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
