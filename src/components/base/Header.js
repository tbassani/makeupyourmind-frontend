import React, { useEffect, useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';

import { useUser } from '../../context/UserContext.js';
import { useApp } from '../../context/AppContext.js';

import DynamicSelect from '../common/DynamicSelect.js';

const Header = (props) => {
  const { signOut } = useUser();
  const { categories, setMaker, setUserInput, setCategory, makers } = useApp();

  const [makerData, setMakerData] = useState([]);

  const handleSignOut = () => {
    signOut().then(() => {
      document.location = '/';
    });
  };

  const handleCategory = (val) => {
    setCategory(val);
  };

  const handleMaker = (val) => {
    setTimeout(() => {
      setMaker(val);
    }, 600);
  };

  const handleUserInput = (val) => {
    setTimeout(() => {
      setUserInput(val);
    }, 600);
  };

  useEffect(() => {
    setMakerData(makers);
  }, [makers]);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Make-up Your Mind</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline>
          <Col>
            <DynamicSelect
              useDescVal={true}
              data={categories}
              handleSelect={handleCategory}
            ></DynamicSelect>
          </Col>
        </Form>
        <Form inline>
          <Col>
            <DynamicSelect
              useDescVal={true}
              data={makerData}
              handleSelect={handleMaker}
            ></DynamicSelect>
          </Col>
        </Form>
        <Nav className="mr-auto"></Nav>
        <Form inline>
          <Col>
            <FormControl
              type="text"
              placeholder="Busca"
              className="mr-sm-2"
              onChange={(e) => handleUserInput(e.target.value)}
            />
          </Col>
        </Form>
        {props.isSigned ? (
          <div>
            <NavDropdown
              title={<span style={{ color: 'white' }}>Usuário</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#" onClick={handleSignOut}>
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        ) : (
          <NavDropdown
            title={<span style={{ color: 'white' }}>Usuário</span>}
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/login">Entrar</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/register">Registrar</NavDropdown.Item>
          </NavDropdown>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
