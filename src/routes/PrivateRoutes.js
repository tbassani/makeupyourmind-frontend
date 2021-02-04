import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isSigned, ...rest }) => {
  console.log(isSigned);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSigned) {
          return <Component {...props} />;
        } else {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
