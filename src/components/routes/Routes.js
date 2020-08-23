import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../layout/NotFound';
import Search from '../search/Search';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/search/:query" component={Search} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
