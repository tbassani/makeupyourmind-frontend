import React, { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import ReactStars from 'react-rating-stars-component';

import * as ratingService from '../../services/rating.js';
import { useUser } from '../../context/UserContext.js';

const RateProduct = (props) => {
  const [rating, setRating] = useState(5);

  const { jwt } = useUser();

  useEffect(() => {
    if (!props.product_id) {
      document.location = '/';
    }
  }, []);

  const rateProduct = () => {
    console.log(rating);
    ratingService.evalProductService(jwt, parseInt(props.product_id), rating);
  };

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  if (props.product_id) {
    return (
      <Card
        style={{
          width: '18rem',
          margin: '0.2rem',
          border: 'solid 1px #CCC',
        }}
        ref={props.prodRef}
      >
        <a href={props.img_ref} target="_blank" rel="noreferrer">
          <Card.Img variant="top" src={props.img} />
        </a>
        <Card.Body
          style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}
        >
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <span>
              <strong>{props.maker}</strong>
            </span>
            <br />
            <span>R${props.price}</span>
          </Card.Text>
          <Col
            style={{
              diplay: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={51.5}
              isHalf={true}
              activeColor="#ffd700"
              value={rating}
            />
            <Button variant="primary" onClick={rateProduct}>
              Avaliar
            </Button>
          </Col>
        </Card.Body>
      </Card>
    );
  } else {
    return <div></div>;
  }
};

export default RateProduct;
