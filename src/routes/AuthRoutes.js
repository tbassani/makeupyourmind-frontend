import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { isAuthService } from '../services/auth.js';

import { useAuth } from '../../src/context/AuthContext.js';

const AuthRoutes = ({ component: Component, ...rest }) => {
  const { signed } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!signed) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        }
      }}
    />
  );
};
export default AuthRoutes;
