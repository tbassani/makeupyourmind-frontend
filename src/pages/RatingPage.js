import React from 'react';

import RateProduct from '../components/product/RateProduct.js';

const RatingPage = (props) => {
  return (
    <div
      id="container"
      style={{ width: '50%', display: 'flex', justifyContent: 'space-evenly', flex: 1 }}
    >
      <RateProduct
        product_id={props.location.product_id}
        img_ref={props.location.img_ref}
        img={props.location.img}
        maker={props.location.maker}
        price={props.location.price}
        name={props.location.name}
        rating={props.location.rating}
      />
    </div>
  );
};

export default RatingPage;
