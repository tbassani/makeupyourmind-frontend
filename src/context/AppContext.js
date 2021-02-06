import React, { createContext, useState, useEffect, useContext } from 'react';

import * as productService from '../services/products.js';
import * as appService from '../services/app.js';

import { useUser } from './UserContext.js';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const { jwt } = useUser();

  const [maker, setMaker] = useState('');
  const [category, setCategory] = useState('');
  const [userInput, setUserInput] = useState('');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skinProfiles, setSkinProfiles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkinProfiles();
    getCategories();
  }, []);

  useEffect(() => {
    //searchProducts()
  }, [maker, category, userInput, page]);

  async function searchProducts() {
    setLoading(true);
    console.log('Search');
    appService.getProductsService(category, maker, userInput, page, setProducts, jwt);
    setLoading(false);
  }

  async function getAllProducts() {
    console.log('Get all products');
    setLoading(true);
    const response = await productService.getProductsService();
    setProducts(response);
    setLoading(false);
    return response;
  }

  async function getCategories() {
    const response = await appService.getCategoriesService();
    setCategories(response);
  }

  async function getSkinProfiles() {
    const response = await appService.getSkinProfilesService();
    setSkinProfiles(response);
  }

  return (
    <AppContext.Provider
      value={{
        maker,
        category,
        setLoading,
        loading,
        setCategory,
        setUserInput,
        setMaker,
        products,
        getAllProducts,
        searchProducts,
        userInput,
        categories,
        setCategories,
        skinProfiles,
        setSkinProfiles,
        categories,
        getCategories,
        getSkinProfiles,
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
