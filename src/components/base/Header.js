import React, { useEffect, useState } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

import { useUser } from '../../context/UserContext.js';
import * as authService from '../../services/auth.js';

const Header = (props) => {
  const { signOut, jwt, setJWT } = useUser();
  const [signed, setSigned] = useState(false);
  const handleSignOut = () => {
    signOut().then(() => {
      console.log('Signout');
      document.location = '/';
    });
  };

  useEffect(() => {
    async function checkIfSigned(jwt, setJWT) {
      return await authService.isAuthService(jwt, setJWT);
    }
    checkIfSigned(jwt, setJWT).then((resp) => {
      console.log(resp);
      setSigned(resp);
    });
  }, [jwt]);
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
