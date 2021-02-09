import React, { createContext, useState, useEffect, useContext } from 'react';

import { useCookies } from 'react-cookie';

import * as authService from '../services/auth.js';
import * as userService from '../services/user.js';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [jwt, setJWT] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profile, setProfile] = useState(null);

  const [cookies, setCookie, removeCookie] = useCookies(['sid']);

  useEffect(() => {
    console.log('Check signIn from context');
    if (jwt && jwt !== '') {
      console.log('JWT existe');
    } else if (cookies.sid) {
      console.log('Cookie existe');
      setJWT(cookies.sid);
    }
    setLoading(false);
    setIsSignedIn(Boolean(jwt));
  }, [cookies]);

  useEffect(() => {
    setIsSignedIn(Boolean(jwt));
  }, [jwt]);

  async function signIn(email, password) {
    console.log('Sign In from Context');
    setLoading(true);
    const response = await authService.signInService(email, password);

    if (!response.errorMsg) {
      setCookie('sid', response.jwt, {
        path: '/',
        expires: new Date(Date.now() + 86400000),
      });
      setUser(response.user);
      setJWT(response.jwt);
    }
    setLoading(false);
    return response;
  }

  async function signOut() {
    console.log('Sign Out from Context');
    setJWT(null);
    removeCookie('sid', { path: '/', domain: '.herokuapp.com' });
    //await authService.signOutService(jwt);
  }

  async function signUp(userData) {
    setLoading(true);
    const resp = await userService.registerUserService(userData, setJWT);
    setLoading(false);
    return resp;
  }

  async function forgotPassword(email) {
    console.log('Forgot password: ' + email);
  }

  async function getUserProfile() {
    console.log('GET USER PROFILE');
    const resp = await userService.getUserProfileService(jwt);
    setProfile(resp);
  }

  async function setUserProfile(profile) {
    setLoading(true);
    const resp = await userService.setUserProfileService(jwt, profile);
    setProfile(resp);
    setLoading(false);
    return resp;
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
        getUserProfile,
        setUserProfile,
        profile,
        cookies,
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
