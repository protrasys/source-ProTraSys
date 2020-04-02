import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// This route will ensure that admin cannot visit control panel without login
const AdminPrivateRoute = ({ component: Component, authorized, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authorized ? <Component {...props} /> : <Redirect to='/adminlogin' />
    }
  />
);

export default AdminPrivateRoute;
