import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// This Route ensures that Facultu cannot visit the Control Panel without Login
const PrivateRoute = ({ component: Component, authorized, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authorized ? <Component {...props} /> : <Redirect to='/facultylogin' />
    }
  />
);

export default PrivateRoute;
