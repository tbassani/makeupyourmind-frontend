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
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log('Check signIn from context');
    setLoading(true);
    async function checkSignIn(jwt, setJWT) {
      await authService.isAuthService(jwt, setJWT);
      setLoading(false);
    }

    checkSignIn(jwt, setJWT);
    setIsSignedIn(Boolean(jwt));
  }, []);

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
    console.log('GET USER PROFILE');
    const resp = await userService.setUserProfileService(jwt, profile);
    setProfile(resp);
    setLoading(false);
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
