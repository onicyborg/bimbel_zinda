import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context-copy';
import { navLinks } from '../data';
import '../main';

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

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Bimbel Zinda</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;