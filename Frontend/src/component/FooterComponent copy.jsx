import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FooterComponent = () => {
  return (
    <footer className="footer py-5 shadow-lg mt-3">
      <Container className="d-flex justify-content-center">
        <Row className="gap-1 mb-3">
          <Col>
            <a href="/" className="">
              Home
            </a>
          </Col>
          <Col>
            <a href="/Class" className="">
              Class
            </a>
          </Col>
          <Col>
            <a href="/FAQ" className="">
              FAQ
            </a>
          </Col>
        </Row>
      </Container>
      <p className="text-center px-md-0 px-3">
        &copy; Copyright {new Date().getFullYear()} by{' '}
        <span className="fw-bold">Annisa & Septi</span>
      </p>
    </footer>
  );
};

export default FooterComponent;
