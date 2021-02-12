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
  return categories.filter((cat) => cat.description !== '27');
};

export const getMakersService = async (jwt, setMakers) => {
  var makers = [];
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  axios({
    method: 'GET',
    url: CONFIG.get_makers,
    headers: headers,
    withCredentials: true,
  })
    .then((res) => {
      makers = res.data.filter((element) => {
        return element.description.trim() !== '';
      });

      makers = makers.sort(function (a, b) {
        if (a.description < b.description) {
          return -1;
        }
        if (a.description > b.description) {
          return 1;
        }
        return 0;
      });

      makers.unshift({ id: '', description: 'Marcas' });

      setMakers(makers);
    })
    .catch((e) => {
      console.error(e);
    });
};

export const getProductsService = async (
  category,
  maker,
  userInput,
  pageNumber,
  setProducts,
  jwt,
  setHasMore,
  products
) => {
  var productsArray = [];
  let cancel;
  var URL = CONFIG.get_products;
  if (!jwt || jwt === '') {
    console.log('GET PRODUCTS ONLY');
    axios({
      method: 'GET',
      url: URL,
      cancelToken: new axios.CancelToken(function executor(c) {
        cancel = c;
      }),
      params: { name: userInput, page: pageNumber, maker: maker, category: category },
    })
      .then((res) => {
        setHasMore(res.data.length > 0);
        // if (res.data.length > 0) {
        //   setProducts((prevProducts) => {
        //     return [...new Set([prevProducts, ...res.data])];
        //   });
        // }
        if (res.data.length > 0) {
          productsArray = res.data;
        }

        // if (res.data.length > 0) {
        //   setProducts(products.concat(res.data));
        // }

        //console.log(res.data);
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
      params: { name: userInput, page: pageNumber, maker: maker, category: category },
    })
      .then((res) => {
        setProducts((prevProducts) => {
          return [...new Set([...prevProducts, ...res.data])];
        });
        setHasMore(res.data.length > 0);
        console.log('RESPONSE FROM GET ALL PRODUCTS AND RATINGS');
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
  return productsArray;
};
