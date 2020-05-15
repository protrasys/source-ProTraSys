import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthServices } from '../Services';

// Importing Private Routers
import IsStudentLoggedIn from './PrivateRouters/Student/isLoggedIn';
import IsStudentLoggedOut from './PrivateRouters/Student/isLoggedOut';
import IsFacultyLoggedIn from './PrivateRouters/Faculty/isLoggedin';
import IsFacultyLoggedOut from './PrivateRouters/Faculty/isLoggedOut';
import IsAdminLoggedIn from './PrivateRouters/Admin/isLoggedIn';
import IsAdminLoggedOut from './PrivateRouters/Admin/isLoggedOut';

import { FacultyLogin, FacultyControlPanel } from '../Pages/Faculty';
import { StudentLogin, StudentControlPanel } from '../Pages/Student';
import { AdminLogin, AdminControlPanel } from '../Pages/Admin';

import LandingPage from '../Pages/Layouts/Landing Page';
import ForOForPage from '../Pages/Layouts/Landing Page/PageNotFound';

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
        <IsAdminLoggedIn
          exact
          path='/admincontrolpanel'
          component={AdminControlPanel}
          authorized={AuthServices.isAdminAuthenticated()}
        />
        <IsAdminLoggedOut
          exact
          path='/adminlogin'
          component={AdminLogin}
          authorized={AuthServices.isAdminAuthenticated()}
        />
        <Route component={ForOForPage} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
