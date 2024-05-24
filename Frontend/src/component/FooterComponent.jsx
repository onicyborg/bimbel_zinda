import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <div className="footer py-5 width-full">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg="5">
            <h3 className="fw-bold">Bimbel Zinda</h3>
            <a
              href="https://www.google.com/maps?q=Blok+B-17+Jalan+Raya+Banyumas+-+Kalibagor+No+9+Dusun+IV+Kalibagor,+Kaliori,+Kec+Kalibagor,+Kab+Banyumas,+Prov+Jawa+Tengah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <p className="desc">
                Blok B-17 Jalan Raya Banyumas - Kalibagor No 9 Dusun IV Kalibagor, Kaliori, Kec Kalibagor, Kab Banyumas, Prov Jawa Tengah
              </p>
            </a>
            <div className="no mb-1 mt-4">
              <a href="https://wa.me/6287839622557" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                <i className="fa-brands fa-whatsapp"></i>
                <p className="m-0">0878-3962-2557</p>
              </a>
            </div>
            <div className="email">
              <a href="mailto:faizalfahmiazzindani@gmail.com" className="text-decoration-none">
                <i className="fa-regular fa-envelope"></i>
                <p className="m-0">faizalfahmiazzindani@gmail.com</p>
              </a>
            </div>
          </Col>
          <Col className="justify-content-center d-flex flex-column justify-content-center col-lg-2 col mt-lg-0 mt-5">
            <h5 className="fw-bold">Menu</h5>
            <a href="/">Home</a>
            <a href="/Class">Kelas</a>
            <a href="/faq">FAQ</a>
            <a href="/Lainnya">Menu Lainnya</a>
          </Col>

        </Row>
        <Row>
          <Col>
            <p className="text-center px-md-0 px-3">&copy; Copyright {new Date().getFullYear()} by <span className="fw-bold">nay</span> All Right Reserved</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterComponent;