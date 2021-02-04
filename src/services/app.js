import axios from 'axios';

import CONFIG from '../config/endpoints.js';

export const getSkinProfilesService = async () => {
  const treatKeyName = (val) => {
    switch (val) {
      case 'skin_color':
        return 'Cor da pele';
      case 'skin_lines':
        return 'Linhas da pele';
      case 'skin_acne':
        return 'Acne';
      case 'skin_oiliness':
        return 'Oleosidade';
      default:
        break;
    }
  };

  var result = {};
  var skinData = {};
  const headers = {
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    method: 'GET',
    url: CONFIG.get_skin_profiles,
    headers: headers,
  })
    .then((res) => {
      skinData = res.data;
    })
    .catch((e) => {
      console.error(e);
    });

  if (skinData) {
    for (const key in skinData) {
      if (skinData.hasOwnProperty(key)) {
        const element = skinData[key];
        element.push({ id: '', description: treatKeyName(key) });
        result[key] = element;
      }
    }
  }
  console.log(result);
  return result;
};

export const getCategoriesService = async () => {
  var categories = [];
  const headers = {
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    method: 'GET',
    url: CONFIG.get_categories,
    headers: headers,
  })
    .then((res) => {
      categories = res.data;
    })
    .catch((e) => {
      console.error(e);
    });

  return categories;
};
