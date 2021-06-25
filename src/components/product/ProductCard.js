import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { Link } from 'react-router-dom';

import ReactStars from 'react-rating-stars-component';

const ProductCard = (props) => {
  const handleClick = () => {
    props.history.push('/register');
  };
  if (!props.isSpinner) {
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
          {props.isSigned ? (
            <div>
              <ReactStars
                count={5}
                size={45}
                isHalf={true}
                activeColor="#ffd700"
                edit={false}
                value={props.rating}
              />
              <Link
                underline="none"
                to={{
                  pathname: '/product_rating',
                  product_id: props.product_id,
                  img_ref: props.img_ref,
                  name: props.name,
                  maker: props.maker,
                  price: props.price,
                  img: props.img,
                  rating: props.rating,
                }}
              >
                Avalie!
              </Link>
            </div>
          ) : (
            <Button variant="primary" onClick={handleClick}>
              Avalie!
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card
        style={{
          width: '18rem',
          margin: '0.2rem',
          border: 'solid 1px #CCC',
        }}
        ref={props.prodRef}
      >
        <Card.Body
          style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        >
          <Spinner animation="border" variant="primary" />
        </Card.Body>
      </Card>
    );
  }
};

export default ProductCard;
