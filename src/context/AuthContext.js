import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    console.log('GET TOKEN FROM LOCAL STORAGE');
  }, []);

  async function signIn(email, password) {
    console.log('Sign In from Context');

    // const response = await authService.signIn(email, password);
    // const { jwt, login_user } = response;
    // setUser(login_user);

    // await AsyncStorage.setItem('user', JSON.stringify(login_user));
    // await AsyncStorage.setItem('token', jwt);
    setLoading(false);
  }

  async function signOut() {
    console.log('Sign Out from Context');
    // AsyncStorage.clear().then(() => {
    //   setUser(null);
    // });
  }

  async function signUp(email) {
    console.log('Signup: ' + email);
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
        signed: Boolean(user),
        user,
        loading,
        email,
        setLoading,
        signIn,
        signOut,
        signUp,
        register,
        forgotPassword,
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
