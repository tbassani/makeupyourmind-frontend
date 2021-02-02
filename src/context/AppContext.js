import React, { createContext, useState, useEffect, useContext } from 'react';

import * as appService from '../services/products.js';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [userInput, setUserInput] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('SET BRAND AND CAT');
  }, []);

  async function searchProducts() {
    console.log('Search');
    setLoading(false);
  }

  async function getAllProducts() {
    console.log('Get all products');
    setLoading(true);
    const response = await appService.getProductsService();
    console.log(response);
    setProducts(response);
    setLoading(false);
    return response;
  }

  return (
    <AppContext.Provider
      value={{
        brand,
        category,
        setLoading,
        loading,
        setCategory,
        setUserInput,
        setBrand,
        products,
        getAllProducts,
        searchProducts,
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
