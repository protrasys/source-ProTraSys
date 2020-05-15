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

// This route will ensure that admin cannot visit control panel without login
const AdminPrivateRoute: React.SFC<IPrivateRouteProps> = (props) => {
  const { component: Component, authorized, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? <Component {...props} /> : <Redirect to='/adminlogin' />
      }
    />
  );
};

export default AdminPrivateRoute;
