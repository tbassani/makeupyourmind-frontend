import React, { createContext, useState, useEffect, useContext } from 'react';

import * as authService from '../services/auth.js';
import * as userService from '../services/user.js';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [jwt, setJWT] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    console.log('Check signIn from context');
    async function checkSignIn(jwt, setJWT) {
      await authService.isAuthService(jwt, setJWT);
    }

    checkSignIn(jwt, setJWT);
    setIsSignedIn(Boolean(jwt));
  }, [jwt]);

  async function signIn(email, password) {
    console.log('Sign In from Context');
    setLoading(true);
    const response = await authService.signInService(email, password);
    setUser(response.user);
    setJWT(response.token);
    setLoading(false);
  }

  async function signOut() {
    console.log('Sign Out from Context');
    setJWT(null);
    await authService.signOutService(jwt);
  }

  async function signUp(userData) {
    return await userService.registerUserService(userData, setJWT);
  }

  async function forgotPassword(email) {
    console.log('Forgot password: ' + email);
  }
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        email,
        isSignedIn,
        setLoading,
        signIn,
        signOut,
        signUp,
        forgotPassword,
        setUser,
        setEmail,
        jwt,
        setJWT,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
//import {useAuth} from '../../../contexts/auth';
// const {signOut, user} = useAuth();
