import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-bootstrap';
import{ useNavigate} from 'react-router-dom';

export const SuccessEditModal = (isShow) =>{
  const [show] = useState(isShow);
  const navigate = useNavigate()
  const handleClose = () => navigate(window.location.pathname);
  // const handleShow = () => setShow(true);


  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sukses!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data berhasil diedit</Modal.Body>
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