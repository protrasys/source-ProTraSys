import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
// import StudentPrivateRouter from './PrivateRouter';

import { FacultyLogin, FacultyControlPanel } from "../components/Faculty";
import { StudentLogin } from "../components/Student";
import LandingPage from "../components/Layouts/Landing Page";

import StudentControlPanel from "../components/Student/Control Panel";
import FileUpload from "../components/Student/Control Panel/";
import ViewENotice from "../components/Student/Control Panel/";

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
        <Route
          exact
          path="/studentcontrolpanel"
          component={StudentControlPanel}
        />
        <Route exact path="/studentlogin" component={StudentLogin} />

        <Route exact path="/fileupload" component={FileUpload} />
        <Route exact path="/viewenotice" component={ViewENotice} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
