import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuth } from '../services/auth.js';

const PrivateRoute = ({ component: Component, jwt, setToken, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth(jwt, setToken)) {
          return <Component {...props} jwt={jwt} setToken={setToken} />;
        } else {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
