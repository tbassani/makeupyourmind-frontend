import React from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProductCard = (props) => {
  return (
    <Card
      style={{
        width: '18rem',
        margin: '0.2rem',
        border: 'solid 1px #CCC',
      }}
    >
      <Card.Img variant="top" src={props.img} />
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
        <Button variant="primary">Avalie!</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
