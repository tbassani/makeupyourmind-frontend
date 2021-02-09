//import decode from 'jwt-decode';
import axios from 'axios';
import decode from 'jwt-decode';

import CONFIG from '../config/endpoints.js';

export const signInService = async (email, password) => {
  var errorMsg = '';
  const headers = {
    contenttype: 'application/json;',
    datatype: 'json',
  };
  const body = { email, password };
  try {
    const resp = await axios({
      method: 'POST',
      url: CONFIG.login,
      headers: headers,
      withCredentials: true,
      data: body,
    });
    const jwt = resp.headers['x-token'];
    const user = resp.data.login_user;
    return {
      user,
      jwt,
    };
  } catch (error) {
    console.log(error.response.data.error);
    errorMsg = error.response.data.error;
    return { errorMsg };
  }
};

export const signOutService = async (jwt) => {
  const headers = {
    contenttype: 'application/json;',
    Authorization: 'Bearer ' + jwt,
    datatype: 'json',
  };
  try {
    await axios({
      method: 'GET',
      url: CONFIG.logout,
      headers: headers,
      withCredentials: true,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const isAuthService = async (jwt, callback) => {
  var result = false;
  if (jwt) {
    const { exp } = decode(jwt);
    if (exp >= Math.floor(new Date().getTime() / 1000)) {
      await fetch(CONFIG.check_token, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then((response) => {
        if (response.status === 200) {
          callback(response.headers.get('X-Token'));
          result = true;
        } else {
          console.log(response);
          callback('');
          result = false;
        }
      });
    }
  } else {
    await fetch(CONFIG.check_token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((response) => {
      if (response.status === 200) {
        callback(response.headers.get('X-Token'));
        result = true;
      } else {
        callback('');
        result = false;
      }
    });
  }
  return result;
};
