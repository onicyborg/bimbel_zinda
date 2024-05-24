import axios from 'axios';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SuccessAdd } from '../../component/Dashboard/SuccessModal';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

export const AddSiswa = () => {
  const jenisKelamin = ['Pria', 'Wanita'];
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
  const [nama, setNama] = useState('');
  const [tempat_lahir, setTempatLahir] = useState('');
  const [tanggal_lahir, setTanggalLahir] = useState('');
  const [jenis_kelamin, setJenisKelamin] = useState(jenisKelamin[0]);
  const [alamat, setAlamat] = useState('');
  const [nama_sekolah, setNamaSekolah] = useState('');
  const [jenjang, setJenjang] = useState(jenjangOptions[0]);
  const [kelas, setKelas] = useState(kelasOptions[0]);
  const [nama_orangtua, setNamaOrangtua] = useState('');
  const [no_handphone, setNoHandphone] = useState('');
  const [kekurangan, setKekurangan] = useState('');
  const [harapan_siswa, setHarapanSiswa] = useState('');
  const [showState, setShowState] = useState(false);
  const [validation, setValidation] = useState([]);

  const url = 'http://127.0.0.1:8000/api/create-siswa';
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/data_siswa/index');
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
    formData.append('nama_sekolah', nama_sekolah);
    formData.append('jenjang', jenjang);
    formData.append('kelas', kelas);
    formData.append('nama_orangtua', nama_orangtua);
    formData.append('no_handphone', no_handphone);
    formData.append('kekurangan', kekurangan);
    formData.append('harapan_siswa', harapan_siswa);

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
      navigate('/dashboard/data_siswa/index');
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
            <Row lg="12">
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
            <Row lg="12">
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
                  controlId="exampleForm.NamaSekolah"
                >
                  <Form.Label>Nama Sekolah</Form.Label>
                  <Form.Control
                    type="text"
                    value={nama_sekolah}
                    onChange={(e) => setNamaSekolah(e.target.value)}
                    isInvalid={!!validation.nama_sekolah}
                  />
                  {validation.nama_sekolah && (
                    <Form.Control.Feedback type="invalid">
                      {validation.nama_sekolah}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row lg="12">
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
              <Col lg="6">
                {' '}
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
            </Row>
            <Row lg="12">
              <Col lg="6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.NamaOrangTua"
                >
                  <Form.Label>Nama Orangtua</Form.Label>
                  <Form.Control
                    type="text"
                    value={nama_orangtua}
                    onChange={(e) => setNamaOrangtua(e.target.value)}
                    isInvalid={!!validation.nama_orangtua}
                  />
                  {validation.nama_orangtua && (
                    <Form.Control.Feedback type="invalid">
                      {validation.nama_orangtua}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
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
            </Row>
            <Row lg="12">
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.Kekurangan">
                  <Form.Label>Kekurangan</Form.Label>
                  <Form.Control
                    type="text"
                    value={kekurangan}
                    onChange={(e) => setKekurangan(e.target.value)}
                    isInvalid={!!validation.kekurangan}
                  />
                  {validation.kekurangan && (
                    <Form.Control.Feedback type="invalid">
                      {validation.kekurangan}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.HarapanSiswa"
                >
                  <Form.Label>Harapan Siswa</Form.Label>
                  <Form.Control
                    type="text"
                    value={harapan_siswa}
                    onChange={(e) => setHarapanSiswa(e.target.value)}
                    isInvalid={!!validation.harapan_siswa}
                  />
                  {validation.harapan_siswa && (
                    <Form.Control.Feedback type="invalid">
                      {validation.harapan_siswa}
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
