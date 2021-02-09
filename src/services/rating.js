import axios from 'axios';

import CONFIG from '../config/endpoints.js';

export const evalProductService = async (jwt, id, rating) => {
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  const body = { user_rating: rating };
  axios({
    method: 'POST',
    url: CONFIG.product_rating + id,
    headers: headers,
    withCredentials: true,
    data: body,
  })
    .then((res) => {
      console.log('PRODUCT DATA');
      console.log(res.data);
    })
    .catch((e) => {
      console.error(e);
    });
};
