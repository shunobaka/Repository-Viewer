/**
 * @fileoverview Defines a Routes react component that renders a react router.
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Landing from '../../pages/Landing/Landing';
import NotFound from '../../pages/NotFound/NotFound';
import Search from '../../pages/Search/Search';
import User from '../../pages/User/User';

/**
 * Routes react component that renders a react router specifying accessible routes.
 */
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/search/:query" component={Search} />
      <Route exact path="/user/:username" component={User} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
