import axios from 'axios';

import CONFIG from '../config/endpoints.js';

export const registerUserService = async (userData, callback) => {
  var result = false;
  var errorMsg = '';
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
      result = false;
      errorMsg = e.response.data.error;
    });
  return {
    result,
    errorMsg,
  };
};

export const getUserProfileService = async (jwt) => {
  var result = {};
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
      result = res.data.user_profile;
    })
    .catch((e) => {
      console.error(e);
    });
  return result;
};

export const setUserProfileService = async (jwt, profile) => {
  var result = false;
  const headers = {
    contenttype: 'application/json;',
    Authorization: 'Bearer ' + jwt,
    datatype: 'json',
  };
  await axios({
    method: 'PUT',
    url: CONFIG.update_skin_profile,
    headers: headers,
    withCredentials: true,
    data: profile,
  })
    .then((res) => {
      result = true;
    })
    .catch((e) => {
      console.error(e);
    });
  return result;
};

export const updateProfileService = async (jwt) => {};
