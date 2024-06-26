import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SuccessAdd } from '../../component/Dashboard/SuccessModal';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

export const AddJadwal = () => {
  const hariOptions = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
  ];

  const [hari, setHari] = useState(hariOptions[0]);
  const [jam_mulai, setJamMulai] = useState('');
  const [jam_selesai, setJamSelesai] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [siswa_id, setSiswaId] = useState('');
  const [tentor_id, setTentorId] = useState('');
  const [mata_pelajaran_id, setMataPelajaranId] = useState('');
  const [siswaData, setSiswaData] = useState([]);
  const [tentorData, setTentorData] = useState([]);
  const [mapelData, setMapelData] = useState([]);
  const [validation, setValidation] = useState([]);
  const [showState, setShowState] = useState(false);
  const cookies = new Cookies();
  const token = cookies.get('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/get-all-siswa',
          config
        );
        const data = response.data.data || [];
        setSiswaData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/get-all-tentor',
          config
        );
        const data = response.data.data || [];
        setTentorData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/get-all-mata-pelajaran',
          config
        );
        const data = response.data.data || [];
        setMapelData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const url = 'http://127.0.0.1:8000/api/create-jadwal';
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard/data_jadwal/index');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('hari', hari);
    formData.append('jam_mulai', jam_mulai);
    formData.append('jam_selesai', jam_selesai);
    formData.append('keterangan', keterangan);
    formData.append('tentor_id', tentor_id);
    formData.append('mata_pelajaran_id', mata_pelajaran_id);
    formData.append('siswa_id', siswa_id);

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
      navigate('/dashboard/data_jadwal/index');
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
            <Form.Group className="mb-3" controlId="exampleForm.Hari">
              <Form.Label>Hari</Form.Label>
              <Form.Select
                value={hari}
                onChange={(e) => setHari(e.target.value)}
                isInvalid={!!validation.hari}
              >
                {hariOptions.map((hari, index) => (
                  <option key={index} value={hari}>
                    {hari}
                  </option>
                ))}
              </Form.Select>
              {validation.hari && (
                <Form.Control.Feedback type="invalid">
                  {validation.hari}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Row>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.JamMulai">
                  <Form.Label>Jam Mulai</Form.Label>
                  <Form.Control
                    type="time"
                    value={jam_mulai}
                    onChange={(e) => setJamMulai(e.target.value)}
                    isInvalid={!!validation.jam_mulai}
                  />
                  {validation.jam_mulai && (
                    <Form.Control.Feedback type="invalid">
                      {validation.jam_mulai}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group className="mb-3" controlId="exampleForm.JamSelesai">
                  <Form.Label>Jam Selesai</Form.Label>
                  <Form.Control
                    type="time"
                    value={jam_selesai}
                    onChange={(e) => setJamSelesai(e.target.value)}
                    isInvalid={!!validation.jam_selesai}
                  />
                  {validation.jam_selesai && (
                    <Form.Control.Feedback type="invalid">
                      {validation.jam_selesai}
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

            <Form.Group
              className="mb-3"
              controlId="exampleForm.MataPelajaranId"
            >
              <Form.Label>Mata Pelajaran</Form.Label>
              <Form.Select
                value={mata_pelajaran_id}
                onChange={(e) => setMataPelajaranId(e.target.value)}
                isInvalid={!!validation.mata_pelajaran_id}
              >
                <option value="">Select Mapel</option>
                {mapelData.map((mata_pelajaran) => (
                  <option key={mata_pelajaran.id} value={mata_pelajaran.id}>
                    {mata_pelajaran.nama_mapel}{' '}
                  </option>
                ))}
              </Form.Select>
              {validation.mata_pelajaran_id && (
                <Form.Control.Feedback type="invalid">
                  {validation.mata_pelajaran_id}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.TentorId">
              <Form.Label>Tentor</Form.Label>
              <Form.Select
                value={tentor_id}
                onChange={(e) => setTentorId(e.target.value)}
                isInvalid={!!validation.tentor_id}
              >
                <option value="">Select Tentor</option>
                {tentorData.map((tentor) => (
                  <option key={tentor.id} value={tentor.id}>
                    {tentor.nama}{' '}
                  </option>
                ))}
              </Form.Select>
              {validation.tentor_id && (
                <Form.Control.Feedback type="invalid">
                  {validation.tentor_id}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.SiswaId">
              <Form.Label>Siswa</Form.Label>
              <Form.Select
                value={siswa_id}
                onChange={(e) => setSiswaId(e.target.value)}
                isInvalid={!!validation.siswa_id}
              >
                <option value="">Select Siswa</option>
                {siswaData.map((siswa) => (
                  <option key={siswa.id} value={siswa.id}>
                    {siswa.nama}{' '}
                  </option>
                ))}
              </Form.Select>
              {validation.siswa_id && (
                <Form.Control.Feedback type="invalid">
                  {validation.siswa_id}
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
