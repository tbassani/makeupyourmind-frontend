import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { useUser } from '../../src/context/UserContext.js';

const AuthRoutes = ({ component: Component, ...rest }) => {
  const { signed } = useUser();
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
