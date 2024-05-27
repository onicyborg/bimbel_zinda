import { useState, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../context/auth.context-copy';
import Swal from 'sweetalert2';

export const Sidebar = () => {
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const navLinks = [
    { id: 1, name: 'Data Siswa', href: '/dashboard/data_siswa/index' },
    { id: 2, name: 'Data Tentor', href: '/dashboard/data_tentor/index' },
    { id: 3, name: 'Data Mapel', href: '/dashboard/data_mapel/index' },
    { id: 4, name: 'Data Jadwal', href: '/dashboard/data_jadwal/index' },
    { id: 5, name: 'Logout', href: '#' },
  ];

  const handleLogout = async () => {
    const url = 'http://127.0.0.1:8000/api/logout';
    const token = cookies.get('token');

    try {
      await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      cookies.remove('token', { path: '/' });
      cookies.remove('name', { path: '/' });
      navigate('/login');
      Swal.fire({
        icon: 'success',
        title: 'Logout Successfully',
        text: 'You have successfully Logout.',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleLogout();
              handleClose();
            }}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <aside className="main-sidebar sidebar-dark-primary ">
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <a href="/dashboard/data_siswa/index" className="image">
              <img
                src="/logo.png"
                className="elevation-2 me-2"
                alt="User Image"
              />
              <span className="text-white">Bimble Private Zinda</span>
            </a>
            <div className="info">
              <a href="#" className="d-block">
                {auth.uname}
              </a>
            </div>
          </div>

          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li
                className={`nav-item ${
                  isOpen ? 'menu-is-opening menu-open' : ''
                }`}
              >
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="#" className="nav-link active">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Active Page</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <NavLink to="#">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Inactive Page</p>
                    </NavLink>
                  </li>
                </ul>
              </li>
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`nav-item ${
                    isOpen ? 'menu-is-opening menu-open' : ''
                  }`}
                >
                  {link.name === 'Logout' ? (
                    <NavLink to="#" className="nav-link" onClick={handleShow}>
                      <p>{link.name}</p>
                    </NavLink>
                  ) : (
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        'nav-link ' + (isActive ? 'active' : '')
                      }
                    >
                      <p>{link.name}</p>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
