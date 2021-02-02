import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AuthRoutes from './AuthRoutes.js';

import LoginPage from '../pages/LoginPage.js';
import WelcomePage from '../pages/WelcomePage.js';
import RegistrationPage from '../pages/RegistrationPage.js';

const Routes = (setToken) => (
  <BrowserRouter>
    <Switch>
      <Route path="/welcome" component={WelcomePage} />;
      <AuthRoutes path="/login" component={LoginPage} />
      <AuthRoutes path="/register" component={RegistrationPage} />
      <Route path="/" component={WelcomePage} />;
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
