import axios from 'axios';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

export const Jadwal = () => {
  const [jadwalData, setJadwalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [siswa_id, setSiswaId] = useState('');
  const [tentor_id, setTentorId] = useState('');
  const [mata_pelajaran_id, setMataPelajaranId] = useState('');
  const [siswaData, setSiswaData] = useState([]);
  const [tentorData, setTentorData] = useState([]);
  const [mapelData, setMapelData] = useState([]);
  const itemsPerPage = 5;
  const [searchKeyword, setSearchKeyword] = useState('');
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/get-all-jadwal',
          config
        );

        const data = response.data.data || [];
        setJadwalData(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Data ini akan dihapus!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal',
      });

      if (result.isConfirmed) {
        await axios.delete(
          `http://127.0.0.1:8000/api/delete-jadwal/${id}`,
          config
        );
        const updatedJadwalData = jadwalData.filter(
          (jadwal) => jadwal.id !== id
        );
        setJadwalData(updatedJadwalData);
        setTotalPages(Math.ceil(updatedJadwalData.length / itemsPerPage));
        Swal.fire('Deleted!', 'Data telah dihapus.', 'success');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire('Error!', 'Terjadi kesalahan saat menghapus data.', 'error');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleShowEdit = (id) => {
    const jadwal = jadwalData.find((s) => s.id === id);
    setEditData(jadwal);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (
      name === 'siswa_id' ||
      name === 'tentor_id' ||
      name === 'mata_pelajaran_id'
    ) {
      const selectedId = parseInt(value);
      setEditData({
        ...editData,
        [name]: selectedId,
      });
    } else {
      setEditData({
        ...editData,
        [name]: value,
      });
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/update-jadwal/${editData.id}`,
        editData,
        config
      );
      const updatedJadwalData = jadwalData.map((jadwal) =>
        jadwal.id === editData.id ? editData : jadwal
      );
      setJadwalData(updatedJadwalData);
      handleCloseModal();
      Swal.fire('Success!', 'Data telah diperbarui.', 'success');
      window.location.reload();
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire('Error!', 'Gagal memperbarui data.', 'error');
    }
  };

  const filteredData = jadwalData.filter((jadwal) =>
    Object.values(jadwal).some((value) =>
      value.toString().toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  const displayData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="card-header">
        <h3 className="card-title">Data Jadwal</h3>
      </div>

      <div className="card-body">
        <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="dt-buttons btn-group flex-wrap">
                <NavLink
                  to="/dashboard/data_jadwal/add"
                  className="btn btn-primary p-2"
                  tabIndex="0"
                  aria-controls="example1"
                  type="button"
                >
                  Tambah Jadwal
                </NavLink>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 d-flex justify-content-end">
              <div id="example1_filter" className="dataTables_filter">
                <label>
                  Search:
                  <input
                    type="search"
                    className="form-control form-control-md"
                    placeholder=""
                    aria-controls="example1"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <table
                id="example1"
                className="table table-bordered table-striped dataTable dtr-inline"
                aria-describedby="example1_info"
              >
                <thead>
                  <tr className="bg-warning">
                    <th>Hari</th>
                    <th>Jam Mulai</th>
                    <th>Jam Selesai</th>
                    <th>Keterangan</th>
                    <th>Siswa</th>
                    <th>Tentor</th>
                    <th>Mata Pelajaran</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    displayData.map((jadwal) => (
                      <tr key={jadwal.id}>
                        <td>{jadwal.hari}</td>
                        <td>{jadwal.jam_mulai}</td>
                        <td>{jadwal.jam_selesai}</td>
                        <td>{jadwal.keterangan}</td>
                        <td>{jadwal.siswa.nama}</td>
                        <td>{jadwal.tentor.nama}</td>
                        <td>{jadwal.mata_pelajaran.nama_mapel}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => handleShowEdit(jadwal.id)}
                            className="me-2"
                          >
                            <MDBIcon far icon="edit" />
                          </Button>

                          <Button
                            variant="danger"
                            onClick={() => handleDelete(jadwal.id)}
                          >
                            <MDBIcon fas icon="trash" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <nav aria-label="Pagination" className="d-flex justify-content-end">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages).keys()].map((number) => (
                <li
                  key={number + 1}
                  className={`page-item ${
                    currentPage === number + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? 'disabled' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Siswa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formHari">
              <Form.Label>Hari</Form.Label>
              <Form.Control
                as="select"
                name="hari"
                value={editData.hari || ''}
                onChange={handleEditChange}
              >
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
                <option value="Minggu">Minggu</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formJamMulai">
              <Form.Label>Jam Mulai</Form.Label>
              <Form.Control
                type="time"
                name="jam_mulai"
                value={editData.jam_mulai ? editData.jam_mulai.slice(0, 5) : ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formJamSelesai">
              <Form.Label>Jam Selesai</Form.Label>
              <Form.Control
                type="time"
                name="jam_selesai"
                value={
                  editData.jam_selesai ? editData.jam_selesai.slice(0, 5) : ''
                }
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formSiswa">
              <Form.Label>Siswa Id</Form.Label>
              <Form.Select
                value={editData.siswa_id || ''}
                onChange={handleEditChange}
                name="siswa_id"
              >
                <option value="">Select Siswa</option>
                {siswaData.map((siswa) => (
                  <option key={siswa.id} value={siswa.id}>
                    {siswa.nama}{' '}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formTentor">
              <Form.Label>Tentor Id</Form.Label>
              <Form.Select
                value={editData.tentor_id || ''}
                onChange={handleEditChange}
                name="tentor_id"
              >
                <option value="">Select Tentor</option>
                {tentorData.map((tentor) => (
                  <option key={tentor.id} value={tentor.id}>
                    {tentor.nama}{' '}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formMapel">
              <Form.Label>Mata Pelajaran Id</Form.Label>
              <Form.Select
                value={editData.mata_pelajaran_id || ''}
                onChange={handleEditChange}
                name="mata_pelajaran_id"
              >
                <option value="">Select Mapel</option>
                {mapelData.map((mata_pelajaran) => (
                  <option key={mata_pelajaran.id} value={mata_pelajaran.id}>
                    {mata_pelajaran.nama_mapel}{' '}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
