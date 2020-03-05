import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { FacultyLogin, FacultyControlPanel } from "../components/Faculty";
import { StudentControlPanel, StudentLogin } from "../components/Student";
import LandingPage from "../components/Layouts/Landing Page";
import FileUpload from "../components/Layouts/Landing Page/FileUpload";

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
        <Route exact path="/file" component={FileUpload} />
        path='/studentcontrolpanel' component={StudentControlPanel}
        />
        <Route exact path="/studentlogin" component={StudentLogin} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
