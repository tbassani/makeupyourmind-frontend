import React from 'react';
import ProductList from '../components/product/ProductList.js';

const WelcomePage = (props) => {
  return (
    <div
      id="container"
      style={{ width: '50%', display: 'flex', justifyContent: 'space-evenly', flex: 1 }}
    >
      <ProductList isSigned={props.isSigned} history={props.history} />
    </div>
  );
};

export default WelcomePage;
