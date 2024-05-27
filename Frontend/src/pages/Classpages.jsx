import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { semuaKelas } from "../data/index";
import FaqComponent from "../component/FaqComponent";
import "../assets/styles/kelas.css";

const Classpages = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleClick = (subject) => {
    setSelectedSubject(selectedSubject === subject ? null : subject); // Mengubah selectedSubject menjadi null jika subject yang diklik sama dengan yang sudah dipilih sebelumnya
  };

  const getSubjectInfo = (subject) => {
    // Ganti informasi mata pelajaran berdasarkan nama mata pelajaran yang dipilih
    switch (subject) {
      case "Matematika":
        return {
          jadwal : "",
          tentor : "",
          informasiLainnya: "",
        };
      case "Bahasa Inggris":
        return {
          jadwal : "",
          tentor : "",
          informasiLainnya: "",
        };
      case "Mengaji":
        return {
          jadwal : "",
          tentor : "",
          informasiLainnya: "",
        };
      case "Bahasa Indonesia":
        return {
          jadwal : "",
          tentor : "",
          informasiLainnya: "",
        };
      case "Fisika":
        return {
          jadwal : "",
          tentor : "",
          informasiLainnya: "",
        };
      case "Kimia":
        return {
          jadwal : "",
          tentor : "",
          informasiLainnya: "",
        };
      case "Ilmu Pengetahuan Alam":
        return {
          jadwal : "",
          tentor : "",
          informasiLainnya: "",
        };
      case "Ilmu Pengetahuan Sosial":
        return {
          jadwal : "",
          tentor : "",
          informasiLainnya: "",
        };
      case "Pendidikan Kewarganegaraan":
        return {
          jadwal : "",
          tentor : "",
          informasiLainnya: "",
        };
      // Tambahkan case untuk mata pelajaran lainnya sesuai kebutuhan
      default:
        return {
          jadwal : "Belum ditentukan",
          tentor : "Belum ditentukan",
          informasiLainnya: "Informasi lebih lanjut akan segera tersedia.",
        };
    }
  };

  const renderSubjectInfo = () => {
    if (!selectedSubject) return null;

    const subjectInfo = getSubjectInfo(selectedSubject);

    return (
      <div className="informasi-matpel text-center">
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <h2>{selectedSubject}</h2>
                  </Card.Title>
                  <Card.Text>
                    <p>Jadwal: {subjectInfo.jadwal}</p>
                    <p>Tentor: {subjectInfo.tentor}</p>
                    <p>{subjectInfo.informasiLainnya}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <div className="kelas-page">
      <div className="kelas min-vh-100">
        <Container>
          <Row>
            <Col>
              <h1 className="fw-bold text-center animate__animated animate__fadeInUp animate__delay-1s" style={{ paddingTop: '50px' }}>
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
                {selectedSubject === kelas.title && renderSubjectInfo()}
                <div className="ket d-flex justify-content-between align-items-center px-3 pb-3"></div>
              </Col>
            ))}
          </Row>
          {/* Tambahkan ruang antara kolom informasi kelas dan pertanyaan yang sering ditanyakan */}
          <Row className="mt-5">
            <Col>
              <hr />
            </Col>
          </Row>
        </Container>
      </div>
      <FaqComponent />
    </div>
  );
};

export default Classpages;