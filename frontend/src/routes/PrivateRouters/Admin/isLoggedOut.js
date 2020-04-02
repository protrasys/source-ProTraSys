import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// This Route ensures that admin cannot visit the Login Page with login credentials
const PrivateRoute = ({ component: Component, authorized, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authorized ? (
        <Redirect to='/admincontrolpanel' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default PrivateRoute;
