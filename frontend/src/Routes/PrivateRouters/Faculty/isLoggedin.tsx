import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IPrivateRouteProps {
  component: any;
  authorized: boolean;
  exact?: boolean;
  path?: string;
  history?: any;
  location?: any;
  match?: any;
}

// This Route ensures that Faculty cannot visit the Control Panel without Login
const PrivateRoute: React.SFC<IPrivateRouteProps> = (props) => {
  const { component: Component, authorized, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? <Component {...props} /> : <Redirect to='/facultylogin' />
      }
    />
  );
};

export default PrivateRoute;
