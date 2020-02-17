import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import FacultyLogin from '../components/Faculty/Login';
// import FacultyControlPanel from '../components/Faculty/ControlPanel';
// import Appbar from '../components/Layouts/Partials/AppBar';
import LandingPage from '../components/Layouts/Landing Page';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/facultylogin' component={FacultyLogin} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
