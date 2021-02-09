import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isSigned, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSigned) {
          return <Component {...props} isSigned={isSigned} />;
        } else {
          return <Redirect to={{ pathname: '/welcome', state: { from: props.location } }} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
