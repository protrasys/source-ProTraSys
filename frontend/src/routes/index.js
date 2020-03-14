import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthServices } from '../Services';

// Importing Private Routers
import IsStudentLoggedIn from './PrivateRouters/Student/isLoggedIn';
import IsStudentLoggedOut from './PrivateRouters/Student/isLoggedOut';
import IsFacultyLoggedIn from './PrivateRouters/Faculty/isLoggedin';
import IsFacultyLoggedOut from './PrivateRouters/Faculty/isLoggedOut';

import { FacultyLogin, FacultyControlPanel } from '../components/Faculty';
import { StudentLogin, StudentControlPanel } from '../components/Student';

import LandingPage from '../components/Layouts/Landing Page';
import ForOForPage from '../components/Layouts/Landing Page/PageNotFound';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <IsFacultyLoggedOut
          exact
          path='/facultylogin'
          component={FacultyLogin}
          authorized={AuthServices.isFacultyAuthenticated()}
        />
        <IsFacultyLoggedIn
          exact
          path='/facultycontrolpanel'
          component={FacultyControlPanel}
          authorized={AuthServices.isFacultyAuthenticated()}
        />
        <IsStudentLoggedIn
          exact
          path='/studentcontrolpanel'
          component={StudentControlPanel}
          authorized={AuthServices.isAuthenticated()}
        />
        <IsStudentLoggedOut
          exact
          path='/studentlogin'
          component={StudentLogin}
          authorized={AuthServices.isAuthenticated()}
        />
        <Route component={ForOForPage} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
