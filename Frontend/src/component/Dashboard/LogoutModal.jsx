import { useState, useEffect } from 'react';
import { NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useNavigate, useLocation} from 'react-router-dom';

export const LogoutModal = (isShow)=> {
const navigate = useNavigate()
const location = useLocation()
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(isShow);
  const handleClose = () => setShow(false);  
  const handleNav = ()=> navigate("/login")

  
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={handleShow} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Silahkan Login Kembali</Modal.Body>
        <Modal.Footer>
          <Button variant="primary">
          <NavLink href={location.pathname}
                    tabindex="0"
                    aria-controls="example1"
                    type="button"
                  >
                    <span>Kembali</span>
                  </NavLink>{" "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
