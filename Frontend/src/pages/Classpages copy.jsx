import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { semuaKelas } from "../data/index";
import FaqComponent from "../component/FaqComponent";
import "../../main.css";


const Classpages = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  // const handleClick = (subject) => {
  //   setSelectedSubject(subject);
  // };

  const getSubjectInfo = (subject) => {
    // Ganti informasi mata pelajaran berdasarkan nama mata pelajaran yang dipilih
    switch (subject) {
      case "MataPelajaran1":
        return {
          jadwal: "Senin - Jumat, 10:00 - 12:00",
          tentor: "Tentor1",
          informasiLainnya: "Informasi tambahan tentang Mata Pelajaran 1.",
        };
      case "MataPelajaran2":
        return {
          jadwal: "Senin - Jumat, 13:00 - 15:00",
          tentor: "Tentor2",
          informasiLainnya: "Informasi tambahan tentang Mata Pelajaran 2.",
        };
      // Tambahkan case untuk mata pelajaran lainnya sesuai kebutuhan
      default:
        return {
          jadwal: "Belum ada jadwal",
          tentor: "Belum ada tentor",
          informasiLainnya: "Informasi tambahan belum tersedia.",
        };
    }
  };

  const subjectInfo = selectedSubject ? getSubjectInfo(selectedSubject) : null;

  return (
    <div className="kelas-page">
      <div className="kelas min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-1s">
                Mata Pelajaran
              </h1>
            </Col>
          </Row>
          <Row>
            {semuaKelas.map((kelas) => (
              <Col
                key={kelas.id}
                className="shadow rounded"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={kelas.delay}
              >
                <img src={kelas.image} alt="" className="w-100 mb-5 rounded-top" />
                <h5 className="text-center mb-5 px-3">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick(kelas.title)}
                  >
                    {kelas.title}
                  </span>
                </h5>
                {subjectInfo && (
                  <div className="informasi-matpel text-center">
                    <Container>
                      <Row>
                        <Col>
                          <Card>
                            <Card.Body>
                              <Card.Title>
                                <h2>{selectedSubject}</h2>
                              </Card.Title>
                              <Card.Text>Jadwal  {subjectInfo.jadwal}</Card.Text>
                              <Card.Text>Tentor  {subjectInfo.tentor}</Card.Text>
                              <Card.Text>{subjectInfo.informasiLainnya}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )}
                <div className="ket d-flex justify-content-between align-items-center px-3 pb-3"></div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <FaqComponent subjectInfo={subjectInfo} />

    </div>
  );
};

export default Classpages;