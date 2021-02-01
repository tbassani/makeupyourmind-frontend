import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useAuth } from '../context/AuthContext.js';

const LoginPage = (props) => {
  const { signIn, user } = useAuth();

  const [email, setEmail] = useState('your@email.com');
  const [password, setPassword] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log('Login');
    console.log(email);
    console.log(password);
  };
  return (
    <div
      id="container"
      style={{ width: '50%', display: 'flex', justifyContent: 'space-evenly', flex: 1 }}
    >
      <Form onSubmit={(e) => onSubmitForm(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserir email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => setEmail('')}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
