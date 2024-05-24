import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SuccessAdd } from '../../component/Dashboard/SuccessModal';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

export const AddTentor = () => {
  const jenisKelamin = ['Pria', 'Wanita'];
  const [nama, setNama] = useState('');
  const [tempat_lahir, setTempatLahir] = useState('');
  const [tanggal_lahir, setTanggalLahir] = useState('');
  const [jenis_kelamin, setJenisKelamin] = useState(jenisKelamin[0]);
  const [alamat, setAlamat] = useState('');
  const [asal_perguruan_tinggi, setAsalPerguruanTInggi] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [pengalaman, setPengalaman] = useState('');
  const [no_handphone, setNoHandphone] = useState('');
  const [email, setEmail] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [showState, setShowState] = useState(false);
  const [validation, setValidation] = useState([]);

  const url = 'http://127.0.0.1:8000/api/create-tentor';
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/data_tentor/index');
  };

  const cookies = new Cookies();
  const token = cookies.get('token');

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('tempat_lahir', tempat_lahir);
    formData.append('tanggal_lahir', tanggal_lahir);
    formData.append('jenis_kelamin', jenis_kelamin);
    formData.append('alamat', alamat);
    formData.append('asal_perguruan_tinggi', asal_perguruan_tinggi);
    formData.append('jurusan', jurusan);
    formData.append('pengalaman', pengalaman);
    formData.append('no_handphone', no_handphone);
    formData.append('email', email);
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
      navigate('/dashboard/data_tentor/index');
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
            <Row>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.Nama">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    isInvalid={!!validation.nama}
                  />
                  {validation.nama && (
                    <Form.Control.Feedback type="invalid">
                      {validation.nama}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.TempatLahir"
                >
                  <Form.Label>Tempat Lahir</Form.Label>
                  <Form.Control
                    type="text"
                    value={tempat_lahir}
                    onChange={(e) => setTempatLahir(e.target.value)}
                    isInvalid={!!validation.tempat_lahir}
                  />
                  {validation.tempat_lahir && (
                    <Form.Control.Feedback type="invalid">
                      {validation.tempat_lahir}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg="6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.TanggalLahir"
                >
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control
                    type="date"
                    value={tanggal_lahir}
                    onChange={(e) => setTanggalLahir(e.target.value)}
                    isInvalid={!!validation.tanggal_lahir}
                  />
                  {validation.tanggal_lahir && (
                    <Form.Control.Feedback type="invalid">
                      {validation.tanggal_lahir}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.JenisKelamin"
                >
                  <Form.Label>Jenis Kelamin</Form.Label>
                  <Form.Select
                    value={jenis_kelamin}
                    onChange={(e) => setJenisKelamin(e.target.value)}
                    isInvalid={!!validation.jenis_kelamin}
                  >
                    {jenisKelamin.map((jenis_kelamin, index) => (
                      <option key={index} value={jenis_kelamin}>
                        {jenis_kelamin}
                      </option>
                    ))}
                  </Form.Select>
                  {validation.jenis_kelamin && (
                    <Form.Control.Feedback type="invalid">
                      {validation.jenis_kelamin}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.Alamat">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    type="text"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    isInvalid={!!validation.alamat}
                  />
                  {validation.alamat && (
                    <Form.Control.Feedback type="invalid">
                      {validation.alamat}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.PerguruanTinggi"
                >
                  <Form.Label>Asal Perguruan Tinggi</Form.Label>
                  <Form.Control
                    type="text"
                    value={asal_perguruan_tinggi}
                    onChange={(e) => setAsalPerguruanTInggi(e.target.value)}
                    isInvalid={!!validation.asal_perguruan_tinggi}
                  />
                  {validation.asal_perguruan_tinggi && (
                    <Form.Control.Feedback type="invalid">
                      {validation.asal_perguruan_tinggi}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.Jurusan">
                  <Form.Label>Jurusan</Form.Label>
                  <Form.Control
                    type="text"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                    isInvalid={!!validation.jurusan}
                  />
                  {validation.jurusan && (
                    <Form.Control.Feedback type="invalid">
                      {validation.jurusan}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.Pengalaman">
                  <Form.Label>Pengalaman</Form.Label>
                  <Form.Control
                    type="text"
                    value={pengalaman}
                    onChange={(e) => setPengalaman(e.target.value)}
                    isInvalid={!!validation.pengalaman}
                  />
                  {validation.pengalaman && (
                    <Form.Control.Feedback type="invalid">
                      {validation.pengalaman}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.Handphone">
                  <Form.Label>Nomor Handphone</Form.Label>
                  <Form.Control
                    type="number"
                    value={no_handphone}
                    onChange={(e) => setNoHandphone(e.target.value)}
                    isInvalid={!!validation.no_handphone}
                  />
                  {validation.no_handphone && (
                    <Form.Control.Feedback type="invalid">
                      {validation.no_handphone}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!validation.email}
                  />
                  {validation.email && (
                    <Form.Control.Feedback type="invalid">
                      {validation.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg="12">
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
              </Col>
            </Row>

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
