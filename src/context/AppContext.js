import React, { createContext, useState, useEffect, useContext } from 'react';

import * as appService from '../services/app.js';

import { useUser } from './UserContext.js';

import axios from 'axios';

import CONFIG from '../config/endpoints.js';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const { jwt, profile, signOut } = useUser();

  const [maker, setMaker] = useState('');
  const [makers, setMakers] = useState([]);
  const [category, setCategory] = useState('');
  const [userInput, setUserInput] = useState('');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skinProfiles, setSkinProfiles] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const startUp = async () => {
      await getCategories();
      await getMakers();
      await getSkinProfiles();
    };
    startUp();
  }, []);

  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [maker, category, userInput, jwt, profile]);

  useEffect(() => {
    setLoadingProducts(true);

    let cancel;
    var URL = CONFIG.get_products;
    if (!jwt || jwt === null || jwt === '') {
      console.log('GET ONLY PRODUCTS');
      axios({
        method: 'GET',
        url: URL,
        cancelToken: new axios.CancelToken(function executor(c) {
          cancel = c;
        }),
        params: {
          name: userInput,
          page: page,
          maker: maker === 'Marcas' ? '' : maker,
          category: category === 'Categoria' ? '' : category,
        },
      })
        .then((res) => {
          console.log(res.data);
          setProducts((prevProducts) => {
            return [...new Set([...prevProducts, ...res.data])];
          });
          setHasMore(res.data.length > 0);
          setLoadingProducts(false);
          console.log(products);
        })
        .catch((e) => {
          if (axios.isCancel(e)) {
            setLoadingProducts(false);
            return;
          }
        });
      if (cancel !== undefined) {
        return () => cancel();
      }
    } else {
      console.log('GET PRODUCTS AND RATINGS');
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
        params: {
          name: userInput,
          page: page,
          maker: maker === 'Marcas' ? '' : maker,
          category: category === 'Categoria' ? '' : category,
        },
      })
        .then((res) => {
          console.log(res.data);
          setProducts((prevProducts) => {
            return [...new Set([...prevProducts, ...res.data])];
          });
          setHasMore(res.data.length > 0);
          setLoadingProducts(false);
          console.log(products);
        })
        .catch((e) => {
          if (axios.isCancel(e)) {
            setLoadingProducts(false);
            return;
          } else {
            signOut();
          }
        });
      if (cancel !== undefined) {
        return () => cancel();
      }
    }
  }, [userInput, page, maker, category, jwt, profile]);

  // async function searchProducts() {
  //   setLoadingProducts(true);
  //   console.log('Search');
  //   await appService.getProductsService(
  //     category,
  //     maker,
  //     userInput,
  //     page,
  //     setProducts,
  //     jwt,
  //     setHasMore,
  //     products
  //   );
  //   setLoadingProducts(false);
  // }

  async function getCategories() {
    const response = await appService.getCategoriesService();
    setCategories(response);
  }

  async function getMakers() {
    await appService.getMakersService(jwt, setMakers);
  }

  async function getSkinProfiles() {
    const response = await appService.getSkinProfilesService();
    setSkinProfiles(response);
  }

  return (
    <AppContext.Provider
      value={{
        maker,
        makers,
        category,
        setLoadingProducts,
        loadingProducts,
        setCategory,
        setUserInput,
        setMaker,
        setPage,
        products,
        userInput,
        categories,
        setCategories,
        skinProfiles,
        setSkinProfiles,
        categories,
        getCategories,
        getSkinProfiles,
        hasMore,
        page,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  return context;
}
