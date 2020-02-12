import React, { Fragment } from 'react';
import Appbar from './components/Layouts/Partials/AppBar';
import LandingPage from './components/Layouts/Landing Page';

const App = () => {
  return (
    <Fragment>
      <Appbar />
      <LandingPage />
    </Fragment>
  );
};

export default App;
