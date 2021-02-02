//import decode from 'jwt-decode';
import CONFIG from '../config/endpoints.js';
import axios from 'axios';

export const signInService = async (email, password) => {
  const headers = {
    contenttype: 'application/json;',
    datatype: 'json',
  };
  const body = { email, password };
  await axios({
    method: 'POST',
    url: CONFIG.login,
    headers: headers,
    withCredentials: true,
    body,
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const isAuthService = (jwt, callback) => {
  return false;
};
