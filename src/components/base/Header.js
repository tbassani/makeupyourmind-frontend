import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { useAuth } from '../../context/AuthContext.js';

const Header = () => {
  const { signOut, signed } = useAuth();
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Make-up Your Mind</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline>
          <FormControl type="text" className="mr-sm-2" placeholder="Categoria" />
        </Form>
        <Form inline>
          <FormControl type="text" className="mr-sm-2" placeholder="Marca" />
        </Form>
        <Nav className="mr-auto"></Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        {signed ? (
          <div>
            <NavDropdown
              title={<span style={{ color: 'white' }}>Usuário</span>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/profile">Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" onClick={{ signOut }}>
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
