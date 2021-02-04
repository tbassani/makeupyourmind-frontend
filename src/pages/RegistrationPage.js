import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import { useUser } from '../context/UserContext.js';
import DynamicSelect from '../components/common/DynamicSelect.js';
import { useApp } from '../context/AppContext.js';

const RegistrationPage = (props) => {
  const { signUp } = useUser();
  const { skinProfiles, getSkinProfiles } = useApp();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('seu@email.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [color, setColor] = useState('');
  const [acne, setAcne] = useState('');
  const [lines, setLines] = useState('');
  const [oiliness, setOiliness] = useState('');
  const [skinTypes, setSkinTypes] = useState({});
  const [colorValid, setColorValid] = useState(true);
  const [acneValid, setAcneValid] = useState(true);
  const [linesValid, setLinesValid] = useState(true);
  const [oilinessValid, setOilinessValid] = useState(true);

  useEffect(() => {
    console.log(skinProfiles);
    setSkinTypes(skinProfiles);
  }, [skinProfiles]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log('Register');
    if (password === confirmPassword) {
      await signUp({
        first_name: firstname,
        last_name: lastname,
        email,
        password,
        skin_color: color,
        skin_acne: acne,
        skin_oiliness: oiliness,
        skin_lines: lines,
      });
      props.history.push('/main');
    } else {
      alert('As senhas não correspondem!');
    }
  };

  const colorHandler = (val) => {
    setColor(val);
  };
  const acneHandler = (val) => {
    setAcne(val);
  };
  const linesHandler = (val) => {
    setLines(val);
  };
  const oilinessHandler = (val) => {
    setOiliness(val);
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
            <Form.Group controlId="formHorizontalEmail">
              <Col>
                <Row>
                  <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    placeholder="Email"
                  />
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formHorizontalPassword">
              <Col>
                <Row>
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    placeholder="Senha"
                  />
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formHorizontalConfirmPassword">
              <Col>
                <Row>
                  <Form.Control
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    type="password"
                    placeholder="Confirmar senha"
                  />
                </Row>
              </Col>
            </Form.Group>
          </Col>
          <Col sm={1}></Col>
          <Col>
            <Form.Group controlId="formGridColor">
              <Col>
                <Row>
                  {skinTypes.skin_color ? (
                    <DynamicSelect
                      aria-required="true"
                      required
                      data={skinTypes.skin_color}
                      default={''}
                      handleSelect={colorHandler}
                    ></DynamicSelect>
                  ) : (
                    <Form.Control></Form.Control>
                  )}
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formGridAcne">
              <Col>
                <Row>
                  {skinTypes.skin_acne ? (
                    <DynamicSelect
                      aria-required="true"
                      required
                      data={skinTypes.skin_acne}
                      default={''}
                      handleSelect={acneHandler}
                    ></DynamicSelect>
                  ) : (
                    <Form.Control></Form.Control>
                  )}
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formGridLines">
              <Col>
                <Row>
                  {skinTypes.skin_lines ? (
                    <DynamicSelect
                      aria-required="true"
                      required
                      data={skinTypes.skin_lines}
                      default={''}
                      handleSelect={linesHandler}
                    ></DynamicSelect>
                  ) : (
                    <Form.Control></Form.Control>
                  )}
                </Row>
              </Col>
            </Form.Group>
            <Form.Group controlId="formGridOiliness">
              <Col>
                <Row>
                  {skinTypes.skin_oiliness ? (
                    <DynamicSelect
                      aria-required="true"
                      required
                      data={skinTypes.skin_oiliness}
                      default={''}
                      handleSelect={oilinessHandler}
                    ></DynamicSelect>
                  ) : (
                    <Form.Control></Form.Control>
                  )}
                </Row>
              </Col>
            </Form.Group>
          </Col>
        </Form.Row>
        <Row style={{ display: 'flex', flexDirection: 'row', flex: 0.2, justifyContent: 'center' }}>
          <Button variant="primary" type="submit">
            Registrar-se
          </Button>
        </Row>
        <Row>
          <Col>
            <Link to="/login">Já é cadastrado?</Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default RegistrationPage;
