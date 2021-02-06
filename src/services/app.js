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
        element.unshift({ id: '', description: treatKeyName(key) });
        result[key] = element;
      }
    }
  }
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
  categories.unshift({ id: '', description: 'Categoria' });
  return categories;
};

export const getProductsService = (category, maker, userInuput, pageNumber, setProducts, jwt) => {
  let cancel;
  var URL = CONFIG.get_products;
  console.log(CONFIG.get_products);
  if (!jwt) {
    axios({
      method: 'GET',
      url: URL,
      cancelToken: new axios.CancelToken(function executor(c) {
        cancel = c;
      }),
      params: { name: userInuput, page: pageNumber, maker: maker, category: category },
    })
      .then((res) => {
        console.log(res.data);
        setProducts((prevProducts) => {
          return [...new Set([...prevProducts, ...res.data])];
        });
        //setHasMore(res.data.length > 0);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
        //setError(true);
      });
    if (cancel !== undefined) {
      return () => cancel();
    }
  } else {
    URL = CONFIG.get_products_and_ratings;
    console.log(CONFIG.get_products_and_ratings);
    const headers = {
      Authorization: 'Bearer ' + jwt,
      contenttype: 'application/json;',
      datatype: 'json',
    };
    axios({
      method: 'GET',
      url: URL,
      headers: headers,
      withCredentials: true,
      cancelToken: new axios.CancelToken(function executor(c) {
        cancel = c;
      }),
      params: { name: userInuput, page: pageNumber, maker: maker, category: category },
    })
      .then((res) => {
        console.log(res.data);
        setProducts((prevProducts) => {
          return [...new Set([...prevProducts, ...res.data])];
        });
        //setHasMore(res.data.length > 0);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          return;
        }
      });
    if (cancel !== undefined) {
      return () => cancel();
    }
  }
};
