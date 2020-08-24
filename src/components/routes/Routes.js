import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../layout/NotFound';
import Search from '../search/Search';
import User from '../user/User';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/search/:query" component={Search} />
      <Route exact path="/user/:username" component={User} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
