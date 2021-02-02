import React, { useEffect } from 'react';

import ProductCard from './ProductCard';
import CardGroup from 'react-bootstrap/CardGroup';

import { useApp } from '../../context/AppContext.js';

const ProductList = (props) => {
  const { products, getAllProducts, loading, error } = useApp();

  useEffect(() => {
    getAllProducts();
  }, []);

  const renderCard = (card, index) => {
    return (
      <ProductCard
        key={card.id}
        img={card.img_src}
        name={card.name}
        maker={card.maker}
        price={card.price}
      />
    );
  };
  return (
    <div>
      <CardGroup>{products.map(renderCard)}</CardGroup>
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
  );
};

export default ProductList;
