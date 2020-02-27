import React, { Fragment } from 'react';
import Profile from '../Components/Profile';
import UploadFile from '../Components/UploadFile';
import ViewENotice from '../Components/ViewENotice';
import { Switch, Route } from 'react-router-dom';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/student/profile' component={Profile} />
        <Route exact path='/student/uploadfile' component={UploadFile} />
        <Route exact path='/student/viewenotice' component={ViewENotice} />
      </Switch>
    </Fragment>
  );
};
export default Routes;
