import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import HeroImage from '../assets/img/buku.png';
import { kelasTerbaru, dataSwiper } from '../data/index';
import FaqComponent from '../component/FaqComponent';

const HomePages = () => {
  let navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="w-100 min-vh-50 d-flex align-items-center overflow-hidden">
        <Container>
          <Row className="header-box d-flex align-items-center pt-lg-5">
            <Col lg="1"></Col>
            <Col lg="5">
              <h1 className="mb-5 animate__animated animate__fadeInUp animate__delay-1s">
                Bimbingan Belajar <br />{' '}
                <span className="fw-bold py-2 mb-2">Private </span> <br />
                di Banyumas!
              </h1>
              <ButtonGroup />
            </Col>
            <Col lg="5" className="pt-lg-0 pt-5 pl-4 mx-4">
              <img
                src={HeroImage}
                alt="Hero"
                className="animate__animated animate__fadeInUp"
              />
            </Col>
          </Row>
        </Container>
      </header>
      <KelasSection />
      <FaqComponent />
      <TestimonialComponent />
    </div>
  );
};

const ButtonGroup = () => {
  let navigate = useNavigate();

  const [contactInfo, setContactInfo] = useState({
    phoneNumber: '62878-3962-2557',
  });

  const handleSubmit = () => {
    console.log('Informasi Kontak:', contactInfo);

    window.location.href = `https://wa.me/${contactInfo.phoneNumber.replace(
      /\D/g,
      ''
    )}`;
  };

  return (
    <div>
      <Button
        className="btn btn-primary btn-lg btn-block rounded-1 me-2 mb-xs-0 mb-2 animate__animated animate__fadeInUp animate__delay-1s"
        onClick={() => handleSubmit()}
      >
        Daftar Sekarang
      </Button>
    </div>
  );
};

const KelasSection = () => {
  let navigate = useNavigate();

  return (
    <div className="kelas w-100 min-vh-100">
      <Container className="mb-5">
        <Col>
          <h1 className="py-5 text-center fw-bold mb-5 animate__animated animate__fadeInUp animate__delay-1s">
            Mata Pelajaran
          </h1>
        </Col>
        <Row>
          {kelasTerbaru.map((kelas) => (
            <KelasCard key={kelas.id} kelas={kelas} />
          ))}
        </Row>
        <ButtonLihatDetail />
      </Container>
    </div>
  );
};

const KelasCard = ({ kelas }) => {
  return (
    <Col
      className="shadow rounded"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={kelas.delay}
    >
      <img src={kelas.image} alt="Kelas" className="w-100 mb-5 rounded-top" />
      <h5 className="text-center mb-5 px-3">{kelas.title}</h5>
    </Col>
  );
};

const ButtonLihatDetail = () => {
  let navigate = useNavigate();

  return (
    <Row>
      <Col className="text-center animate__animated animate__fadeInUp animate__delay-1s">
        <Button
          className="btn btn-primary btn-lg btn-block"
          data-aos="fade-Up"
          data-aos-duration="1000"
          onClick={() => navigate('/Class')}
        >
          Lihat Detail<i className="fa-solid fa-chevron-right ms-1"></i>
        </Button>
      </Col>
    </Row>
  );
};

const TestimonialComponent = () => {
  let navigate = useNavigate();

  const navigateToTestimonial = () => {
    navigate('/testimonial');
  };

  return (
    <div className="footer py-5">
      <Container>
      <Row className="d-flex justify-content-center mb-5">
          <Col lg="6" className="text-center">
            <h1 className="text-center fw-bold mb-5 animate__animated animate__fadeInUp animate__delay-1s">
              Yuk simak apa kata mereka?
            </h1>
          </Col>
        </Row>
        <Row>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              992: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 60,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {dataSwiper.map((data) => {
              return (
                <SwiperSlide key={data.id} className="shadow-sm">
                  <p className="desc">{data.desc}</p>
                  <div className="people">
                    <img
                      src={data.image}
                      alt=""
                      className="testimonial-image"
                    />
                    <div>
                      <h5 className="mb-1">{data.name}</h5>
                      <p className="m-0 fw-bold">{data.skill}</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Row>
        <Row className="d-flex justify-content-between align-items-center mt-5">
          <Col lg="6" className="mb-4 mb-lg-0">
            <div className="card p-3 h-100">
              <h3 className="fw-bold mt-3">Bimbel Zinda</h3>
              <a
                href="https://www.google.com/maps?q=Blok+B-17+Jalan+Raya+Banyumas+-+Kalibagor+No+9+Dusun+IV+Kalibagor,+Kaliori,+Kec+Kalibagor,+Kab+Banyumas,+Prov+Jawa+Tengah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <p className="desc">
                  Blok B-17 Jalan Raya Banyumas - Kalibagor No 9 Dusun IV
                  Kalibagor, Kaliori, Kec Kalibagor, Kab Banyumas, Prov Jawa
                  Tengah
                </p>
              </a>
              <div className="no mb-1 mt-4">
                <a
                  href="https://wa.me/6287839622557"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                  <p className="m-0">0878-3962-2557</p>
                </a>
              </div>
              <div className="email">
                <a
                  href="mailto:faizalfahmiazzindani@gmail.com"
                  className="text-decoration-none"
                >
                  <i className="fa-regular fa-envelope"></i>
                  <p className="m-0">faizalfahmiazzindani@gmail.com</p>
                </a>
              </div>
            </div>
          </Col>
          <Col lg="6" className="d-flex justify-content-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.743008358157!2d109.298817682305!3d-7.493601067841365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655b6bd85d93d9%3A0x2bd4df3cf65283c2!2sJl.%20Raya%20Banyumas%20-%20Kalibagor%20No.9%20B-17%2C%20Dusun%20IV%20Kalibagor%2C%20Kaliori%2C%20Kec.%20Kalibagor%2C%20Kabupaten%20Banyumas%2C%20Jawa%20Tengah%2053191!5e0!3m2!1sid!2sid!4v1716565386614!5m2!1sid!2sid"
              width="450"
              height="280"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePages;