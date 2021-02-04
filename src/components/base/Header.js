import React, { useState, useEffect } from 'react';

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
  const { searchProducts, categories } = useApp();

  const [maker, setMaker] = useState('');
  const [category, setCategory] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleSignOut = () => {
    signOut().then(() => {
      console.log('Signout');
      document.location = '/';
    });
  };

  const handleCategory = (val) => {
    setCategory(val);
  };

  const handleMaker = (val) => {
    setTimeout(() => {
      setMaker(val);
    }, 500);
  };

  const handleUserInput = (val) => {
    setTimeout(() => {
      setUserInput(val);
    }, 500);
  };

  useEffect(() => {
    searchProducts(category, maker, userInput);
  }, [category, maker, userInput]);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Make-up Your Mind</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline>
          <Col>
            {/* <Form.Control
              onChange={(e) => handleCategory(e.target.value)}
              as="select"
              defaultValue="Escolha..."
            >
              <option value="">Escolha...</option>
              <option value="1">Face</option>
              <option value="2">Lábios</option>
              <option value="3">Olhos</option>
              <option value="4">Sobrancelha</option>
              <option value="5">acessorios</option>
              <option value="6">Kits de maquiagem</option>
              <option value="7">Unhas</option>
              <option value="8">Maquiagem</option>
            </Form.Control> */}
            <DynamicSelect data={categories} handleSelect={handleCategory}></DynamicSelect>
          </Col>
        </Form>
        <Form inline>
          <Col>
            <FormControl
              type="text"
              className="mr-sm-2"
              placeholder="Marca"
              onChange={(e) => handleMaker(e.target.value)}
            />
          </Col>
        </Form>
        <Nav className="mr-auto"></Nav>
        <Form inline>
          <Col>
            <FormControl
              type="text"
              placeholder="Search"
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
