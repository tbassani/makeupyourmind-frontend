import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isSigned, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSigned) {
          return <Component {...props} />;
        } else {
          console.log(isSigned);
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
