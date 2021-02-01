import React, { createContext, useState, useEffect, useContext } from 'react';

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

  async function search() {
    console.log('Search');
    setLoading(false);
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
