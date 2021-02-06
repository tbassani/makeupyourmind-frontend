import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'react-router-dom';

import { useUser } from '../context/UserContext.js';

const LoginPage = (props) => {
  const { signIn } = useUser();

  const [email, setEmail] = useState('your@email.com');
  const [password, setPassword] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const resp = await signIn(email, password);
    if (!resp.errorMsg) {
      props.history.push('/');
    } else {
      alert(resp.errorMsg);
    }
  };
  return (
    <div
      id="container"
      style={{ width: '50%', display: 'flex', justifyContent: 'space-evenly', flex: 1 }}
    >
      <Form onSubmit={(e) => onSubmitForm(e)}>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Inserir email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => setEmail('')}
            />
            <Form.Text className="text-muted">
              Não compartilharemos seu e-mail com ninguém
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Entrar
          </Button>
          <Row>
            <Col>
              <Link to="/register">Não é cadastrado?</Link>
            </Col>
          </Row>
        </Col>
      </Form>
    </div>
  );
};

export default LoginPage;
