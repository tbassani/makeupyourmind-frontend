import React, { createContext, useState, useEffect, useContext } from 'react';

import * as appService from '../services/products.js';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [maker, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [userInput, setUserInput] = useState('');
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('SET BRAND AND CAT');
  }, []);

  async function searchProducts(category, maker, userInuput) {
    setLoading(true);
    console.log('Search');
    setLoading(false);
  }

  async function getAllProducts() {
    console.log('Get all products');
    setLoading(true);
    const response = await appService.getProductsService();
    setProducts(response);
    setLoading(false);
    return response;
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
        setBrand,
        products,
        getAllProducts,
        searchProducts,
        userInput,
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
