import { useState, useEffect } from 'react';
import { NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useNavigate, useLocation} from 'react-router-dom';

export const SuccessAdd = (isShow)=> {
const navigate = useNavigate()
const location = useLocation()
  const [show, setShow] = useState(isShow);
  // const handleShow = () => setShow();
  const handleClose = () => setShow(false);  
  const handleNav = ()=> navigate(location.pathname)

  
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sukses!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data berhasil ditambahkan</Modal.Body>
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
