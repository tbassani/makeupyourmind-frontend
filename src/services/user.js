import axios from 'axios';

import CONFIG from '../config/endpoints.js';

export const registerUserService = async (userData, callback) => {
  var result = false;
  const headers = {
    contenttype: 'application/json;',
    datatype: 'json',
  };

  await axios({
    method: 'POST',
    url: CONFIG.register,
    headers: headers,
    withCredentials: true,
    data: userData,
  })
    .then((res) => {
      result = true;
      callback(res.headers['x-token']);
    })
    .catch((e) => {
      console.error(e);
    });
  return result;
};

export const getUserProfileService = async (jwt) => {
  var result = [];
  const headers = {
    contenttype: 'application/json;',
    Authorization: 'Bearer ' + jwt,
    datatype: 'json',
  };
  await axios({
    method: 'GET',
    url: CONFIG.get_user_profile,
    headers: headers,
    withCredentials: true,
  })
    .then((res) => {
      result = res.data;
    })
    .catch((e) => {
      console.error(e);
    });
  return result;
};

export const updateProfileService = async (jwt) => {};
