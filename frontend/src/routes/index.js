import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthServices } from "../Services";

// Importing Private Routers
import IsStudentLoggedIn from "./PrivateRouters/Student/isLoggedIn";
import IsStudentLoggedOut from "./PrivateRouters/Student/isLoggedOut";

import { FacultyLogin, FacultyControlPanel } from "../components/Faculty";
import { StudentLogin, StudentControlPanel } from "../components/Student";

import LandingPage from "../components/Layouts/Landing Page";
import ForOForPage from "../components/Layouts/Landing Page/PageNotFound";

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
        <IsStudentLoggedOut
          exact
          path="/studentlogin"
          component={StudentLogin}
          authorized={AuthServices.isAuthenticated()}
        />
        <Route component={ForOForPage} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
