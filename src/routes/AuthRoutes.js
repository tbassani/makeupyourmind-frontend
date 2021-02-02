import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { isAuthService } from '../services/auth.js';

const AuthRoutes = ({ component: Component, jwt, setToken, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthService(jwt, setToken)) {
          return <Component {...props} jwt={jwt} setToken={setToken} />;
        } else {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        }
      }}
    />
  );
};
export default AuthRoutes;
