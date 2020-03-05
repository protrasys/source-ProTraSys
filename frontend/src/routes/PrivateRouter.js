import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthServices } from '../Services';

const PrivateRouter = async ({ component: Component, ...rest }) => {
  let isLoggedin = await AuthServices.isAuthenticated();
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedin ? <Redirect to='/studentlogin' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRouter;
