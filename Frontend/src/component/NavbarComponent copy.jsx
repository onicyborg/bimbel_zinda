import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context-copy';
import { navLinks } from '../data';
import '../main';
import { Button } from 'react-bootstrap';

function BasicExample() {
  const auth = useContext(AuthContext);
  const updatedNavLinks = navLinks.map((link) => {
    if (link.text === 'Login') {
      return auth.isLoggedIn
        ? { ...link, path: '/logout', text: 'Logout' }
        : link;
    }
    return link;
  });
  console.log(auth.isLoggedIn);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-item-center">
          <img src="./public/logo.png" alt="logo" style={{ width: '24px' }} />
          <span className="ms-2">Bimbel Zinda</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="text-center">
            {updatedNavLinks.map((link) => (
              <NavLink
                to={link.path}
                className="nav-link"
                activeClassName="active"
                key={link.id}
                exact={link.exact}
              >
                {link.text}
              </NavLink>
            ))}
          </Nav>
          <Nav>
            <NavLink to={'/login'} className={'btn btn-primary'}>
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;