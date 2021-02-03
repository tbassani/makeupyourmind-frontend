import React, { createContext, useState, useEffect, useContext } from 'react';

import * as authService from '../services/auth.js';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [jwt, setJWT] = useState('');

  useEffect(() => {
    async function checkSignIn(jwt, setJWT) {
      await authService.isAuthService(jwt, setJWT);
    }
    // Execute the created function directly
    checkSignIn(jwt, setJWT);
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
    console.log('Signup');
    console.log(userData);
  }

  async function forgotPassword(email) {
    console.log('Forgot password: ' + email);
  }

  async function register(email, password, code) {
    console.log('Register from Context: ' + email);

    // const response = await authService.register(email, password, code);
    // const { jwt, register_user } = response;
    // console.log(response);
    // setUser(register_user);

    // await AsyncStorage.setItem('user', JSON.stringify(user));
    // await AsyncStorage.setItem('token', jwt);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        email,
        setLoading,
        signIn,
        signOut,
        signUp,
        register,
        forgotPassword,
        setUser,
        setEmail,
        jwt,
        setJWT,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
//import {useAuth} from '../../../contexts/auth';
// const {signOut, user} = useAuth();
