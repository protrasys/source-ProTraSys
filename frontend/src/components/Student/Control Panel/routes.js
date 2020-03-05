import React from 'react';
import { Route, Switch } from 'react-router-dom';

import StudentProfile from './Pages/Profile';
import FileUpload from './Pages/FileUpload';
import ViewENotice from './Pages/ViewENotice';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/studentcontrolpanel' component={StudentProfile} />
        <Route exact path='/fileupload' component={FileUpload} />
        <Route exact path='/viewenotice' component={ViewENotice} />
      </Switch>
    </section>
  );
};

export default Routes;
