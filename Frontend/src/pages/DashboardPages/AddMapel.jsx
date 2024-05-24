import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SuccessAdd } from '../../component/Dashboard/SuccessModal';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

export const AddMapel = () => {
  const jenjangOptions = ['TK', 'SD', 'SMP', 'SMA', 'SMK'];
  const kelasOptions = [
    'TK',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  const [nama_mapel, setNamaMapel] = useState('');
  const [jenjang, setJenjang] = useState(jenjangOptions[0]);
  const [kelas, setKelas] = useState(kelasOptions[0]);
  const [keterangan, setKeterangan] = useState('');
  const [showState, setShowState] = useState(false);
  const [validation, setValidation] = useState([]);

  const url = 'http://127.0.0.1:8000/api/create-mata-pelajaran';
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/dashboard/data_mapel/index');
  };

  const cookies = new Cookies();
  const token = cookies.get('token');

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nama_mapel', nama_mapel);
    formData.append('jenjang', jenjang);
    formData.append('kelas', kelas);
    formData.append('keterangan', keterangan);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowState(true);
      Swal.fire({
        icon: 'success',
        title: 'Create Data Successfully',
        text: 'You have successfully create data.',
      });
      navigate('/dashboard/data_mapel/index');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidation(error.response.data.errors);
        console.log(response);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Container>
      <div className="card my-3 p-3">
        <div className="content">
          <form onSubmit={submitHandler}>
            {showState && <SuccessAdd isShow={showState} />}
            <Row lg="12">
              <Col lg="12">
                <Form.Group className="mb-3" controlId="exampleForm.NamaMapel">
                  <Form.Label>Nama Mapel</Form.Label>
                  <Form.Control
                    type="text"
                    value={nama_mapel}
                    onChange={(e) => setNamaMapel(e.target.value)}
                    isInvalid={!!validation.nama_mapel}
                  />
                  {validation.nama_mapel && (
                    <Form.Control.Feedback type="invalid">
                      {validation.nama_mapel}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row lg="12">
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.Kelas">
                  <Form.Label>Kelas</Form.Label>
                  <Form.Select
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    isInvalid={!!validation.kelas}
                  >
                    {kelasOptions.map((kelas, index) => (
                      <option key={index} value={kelas}>
                        {kelas}
                      </option>
                    ))}
                  </Form.Select>
                  {validation.kelas && (
                    <Form.Control.Feedback type="invalid">
                      {validation.kelas}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.Jenjang">
                  <Form.Label>Jenjang</Form.Label>
                  <Form.Select
                    value={jenjang}
                    onChange={(e) => setJenjang(e.target.value)}
                    isInvalid={!!validation.jenjang}
                  >
                    {jenjangOptions.map((jenjang, index) => (
                      <option key={index} value={jenjang}>
                        {jenjang}
                      </option>
                    ))}
                  </Form.Select>
                  {validation.jenjang && (
                    <Form.Control.Feedback type="invalid">
                      {validation.jenjang}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.Keterangan">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                isInvalid={!!validation.keterangan}
              />
              {validation.keterangan && (
                <Form.Control.Feedback type="invalid">
                  {validation.keterangan}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Row lg="12">
              <Col lg="6">
                <Button
                  className="btn btn-secondary btn-lg btn-block rounded-1 me-2 mb-xs-0 mb-2"
                  onClick={handleBack}
                >
                  Kembali
                </Button>
              </Col>
              <Col lg="6">
                <Button
                  className="btn btn-primary btn-lg btn-block rounded-1 me-2 mb-xs-0 mb-2"
                  type="submit"
                  value="Tambah"
                >
                  Tambah
                </Button>
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </Container>
  );
};
