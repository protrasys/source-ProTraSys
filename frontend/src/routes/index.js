import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FacultyLogin, FacultyControlPanel } from '../components/Faculty';
import { StudentControlPanel, StudentLogin } from '../components/Student';
import LandingPage from '../components/Layouts/Landing Page';
import FileUpload from '../components/Layouts/Landing Page/FileUpload';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/facultylogin' component={FacultyLogin} />
        <Route
          exact
          path='/facultycontrolpanel'
          component={FacultyControlPanel}
        />
        <Route
          exact
<<<<<<< HEAD
          path='/file'
          component={FileUpload}
        />
=======
          path='/studentcontrolpanel'
          component={StudentControlPanel}
        />
        <Route exact path='/studentlogin' component={StudentLogin} />
>>>>>>> 458cbc1bd240b44776d4e2867802b4ed0cea85b4
      </Switch>
    </Fragment>
  );
};

export default Routes;
