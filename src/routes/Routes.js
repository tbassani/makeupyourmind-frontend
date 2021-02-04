import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthRoutes from './AuthRoutes.js';
import PrivateRoutes from './PrivateRoutes.js';

import LoginPage from '../pages/LoginPage.js';
import WelcomePage from '../pages/WelcomePage.js';
import RegistrationPage from '../pages/RegistrationPage.js';
import ProfilePage from '../pages/ProfilePage.js';

const Routes = (props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/welcome" component={WelcomePage} />
      <AuthRoutes path="/login" component={LoginPage} isSigned={props.isSigned} />
      <AuthRoutes path="/register" component={RegistrationPage} isSigned={props.isSigned} />
      <PrivateRoutes path="/profile" component={ProfilePage} isSigned={props.isSigned} />
      <Route path="/" component={WelcomePage} />;
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
