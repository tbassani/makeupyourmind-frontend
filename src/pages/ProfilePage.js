import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useUser } from '../context/UserContext.js';

const RegistrationPage = (props) => {
  const { signUp } = useUser();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('seu@email.com');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('');
  const [acne, setAcne] = useState('');
  const [lines, setLines] = useState('');
  const [oiliness, setOiliness] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log('Update Profile');

    props.history.push('/main');
  };

  const colorHandler = (event) => {
    setColor(event.target.value);
  };
  const acneHandler = (event) => {
    setAcne(event.target.value);
  };
  const linesHandler = (event) => {
    setLines(event.target.value);
  };
  const oilinessHandler = (event) => {
    setOiliness(event.target.value);
  };
  return (
    <div
      id="container"
      style={{
        width: '80%',
        display: 'flex',
        justifyContent: 'space-evenly',
        margin: '1rem',
        flexDirection: 'column',
        flex: 0.6,
      }}
    >
      <h2>Registre-se!</h2>
      <Form
        onSubmit={(e) => onSubmitForm(e)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 0.5,
        }}
      >
        <Form.Row>
          <Col>
            <Form.Group controlId="formHorizontalFirstname">
              <Col>
                <Row>
                  <Form.Label>Nome</Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    defaultValue={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    type="text"
                    placeholder="Nome"
                  />
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formHorizontalLastname">
              <Col>
                <Row>
                  <Form.Label>Sobrenome</Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    defaultValue={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                    type="text"
                    placeholder="Sobrenome"
                  />
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formHorizontalEmail">
              <Col>
                <Row>
                  <Form.Label>Email</Form.Label>
                </Row>
                <Row>
                  <Form.Control readonly defaultValue={email} type="email" placeholder="Email" />
                </Row>
              </Col>
            </Form.Group>
          </Col>
          <Col sm={1}></Col>
          <Col>
            <Form.Group controlId="formGridColor">
              <Col>
                <Row>
                  <Form.Label>Cor da pele</Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    onChange={(e) => colorHandler(e)}
                    required
                    as="select"
                    defaultValue="Escolha..."
                  >
                    <option value="">Escolha...</option>
                    <option>teste</option>
                  </Form.Control>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formGridAcne">
              <Col>
                <Row>
                  <Form.Label>Acne</Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    onChange={(e) => acneHandler(e)}
                    required
                    as="select"
                    defaultValue="Escolha..."
                  >
                    <option value="">Escolha...</option>
                    <option>...</option>
                  </Form.Control>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formGridLines">
              <Col>
                <Row>
                  <Form.Label>Linhas da Pele</Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    onChange={(e) => linesHandler(e)}
                    required
                    as="select"
                    defaultValue="Escolha..."
                  >
                    <option value="">Escolha...</option>
                    <option>...</option>
                  </Form.Control>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formGridOiliness">
              <Col>
                <Row>
                  <Form.Label>Oleosidade</Form.Label>
                </Row>
                <Row>
                  <Form.Control
                    onChange={(e) => oilinessHandler(e)}
                    required
                    as="select"
                    defaultValue="Escolha..."
                  >
                    <option value="">Escolha...</option>
                    <option>...</option>
                  </Form.Control>
                </Row>
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
        <Row style={{ display: 'flex', flexDirection: 'row', flex: 0.2, justifyContent: 'center' }}>
          <Button variant="primary" type="submit">
            Atualizar
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default RegistrationPage;
