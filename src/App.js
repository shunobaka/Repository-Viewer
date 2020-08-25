/**
 * @fileoverview Defines the main App react component.
 */
import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/** Redux */
import { Provider } from 'react-redux';
import store from './store';

/** Custom components */
import Navigation from './components/layout/Navigation';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Routes from './components/routes/Routes';

/** Styling */
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/**
 * The main App component that is being rendered and contains all other components.
 */
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navigation />
          <Alert />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
