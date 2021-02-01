import ProductCard from './ProductCard';

import { useApp } from '../context/AppContext.js';

const ProductList = (props) => {
  const { products } = useApp();
  const renderCard = () => {
    <ProductCard />;
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
