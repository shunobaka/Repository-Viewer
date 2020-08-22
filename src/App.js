import React, { Fragment } from 'react';
import Navigation from './components/layout/Navigation';
import Landing from './components/layout/Landing';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Navigation></Navigation>
      <Landing></Landing>
    </Fragment>
  );
};

export default App;
