import React, { useCallback, useRef, useEffect, useState } from 'react';

import ProductCard from './ProductCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { useApp } from '../../context/AppContext.js';

const ProductList = (props) => {
  const { products, loadingProducts, setPage, page, hasMore } = useApp();

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loadingProducts) {
        console.log('IS LOADING');
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('VISIBLE');
          setPage(page + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [page, setPage, hasMore, loadingProducts]
  );

  const renderCard = (card, index) => {
    if (card.id) {
      if (!loadingProducts) {
        if (products.length === index + 1 && hasMore) {
          return (
            <ProductCard
              prodRef={lastProductRef}
              key={card.id}
              img={card.img_src}
              name={card.name}
              maker={card.maker}
              price={card.price}
              img_ref={card.ref}
              isSigned={props.isSigned}
              history={props.history}
              product_id={card.id}
              rating={
                card.ratingAmount && parseInt(card.ratingAmount) !== 0
                  ? card.totalRating / parseInt(card.ratingAmount)
                  : 0
              }
            />
          );
        } else {
          return (
            <ProductCard
              key={card.id}
              img={card.img_src}
              name={card.name}
              maker={card.maker}
              price={card.price}
              img_ref={card.ref}
              isSigned={props.isSigned}
              history={props.history}
              product_id={card.id}
              rating={
                card.ratingAmount && parseInt(card.ratingAmount) !== 0
                  ? card.totalRating / parseInt(card.ratingAmount)
                  : 0
              }
            />
          );
        }
      } else {
        return (
          <ProductCard
            key={card.id}
            img={card.img_src}
            name={card.name}
            maker={card.maker}
            price={card.price}
            img_ref={card.ref}
            isSpinner={true}
            isSigned={props.isSigned}
            history={props.history}
            rating={
              card.ratingAmount && parseInt(card.ratingAmount) !== 0
                ? card.totalRating / parseInt(card.ratingAmount)
                : 0
            }
            product_id={card.id}
          />
        );
      }
    }
  };
  return (
    <Col style={{ padding: '7%' }}>
      <Row>{products.map(renderCard)}</Row>
    </Col>
  );
};

export default ProductList;
