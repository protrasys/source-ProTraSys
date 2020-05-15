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

// This Route ensures that admin cannot visit the Login Page with login credentials
const PrivateRoute: React.SFC<IPrivateRouteProps> = (props) => {
  const { component: Component, authorized, ...rest } = props;
  return (
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
};

export default PrivateRoute;
