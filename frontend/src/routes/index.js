<<<<<<< HEAD
import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
// import StudentPrivateRouter from './PrivateRouter';

import { FacultyLogin, FacultyControlPanel } from "../components/Faculty";
import { StudentLogin } from "../components/Student";
import LandingPage from "../components/Layouts/Landing Page";

import StudentControlPanel from "../components/Student/Control Panel";
import FileUpload from "../components/Student/Control Panel/";
import ViewENotice from "../components/Student/Control Panel/";
=======
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthServices } from '../Services';

// Importing Private Routers
import IsStudentLoggedIn from './PrivateRouters/Student/isLoggedIn';
import IsStudentLoggedOut from './PrivateRouters/Student/isLoggedOut';

import { FacultyLogin, FacultyControlPanel } from '../components/Faculty';
import { StudentLogin, StudentControlPanel } from '../components/Student';

import LandingPage from '../components/Layouts/Landing Page';
import ForOForPage from '../components/Layouts/Landing Page/PageNotFound';
>>>>>>> master

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/facultylogin" component={FacultyLogin} />
        <Route
          exact
          path="/facultycontrolpanel"
          component={FacultyControlPanel}
        />
        <IsStudentLoggedIn
          exact
          path="/studentcontrolpanel"
          component={StudentControlPanel}
          authorized={AuthServices.isAuthenticated()}
        />
<<<<<<< HEAD
        <Route exact path="/studentlogin" component={StudentLogin} />

        <Route exact path="/fileupload" component={FileUpload} />
        <Route exact path="/viewenotice" component={ViewENotice} />
=======
        <IsStudentLoggedOut
          exact
          path='/studentlogin'
          component={StudentLogin}
          authorized={AuthServices.isAuthenticated()}
        />
        <Route component={ForOForPage} />
>>>>>>> master
      </Switch>
    </Fragment>
  );
};

export default Routes;
