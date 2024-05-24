import axios from 'axios';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

export const Siswa = () => {
  const [siswaData, setSiswaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
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
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching data:', error);
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
          `http://127.0.0.1:8000/api/delete-siswa/${id}`,
          config
        );
        const updatedSiswaData = siswaData.filter((siswa) => siswa.id !== id);
        setSiswaData(updatedSiswaData);
        setTotalPages(Math.ceil(updatedSiswaData.length / itemsPerPage));
        Swal.fire('Deleted!', 'Data telah dihapus.', 'success');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      Swal.fire(
        'Error!',
        'Lakukan penghapusan data pada tabel jadwal terlebih dahulu.',
        'error'
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleShowEdit = (id) => {
    const siswa = siswaData.find((s) => s.id === id);
    setEditData(siswa);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/update-siswa/${editData.id}`,
        editData,
        config
      );
      const updatedSiswaData = siswaData.map((siswa) =>
        siswa.id === editData.id ? editData : siswa
      );
      setSiswaData(updatedSiswaData);
      handleCloseModal();
      Swal.fire('Success!', 'Data telah diperbarui.', 'success');
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire('Error!', 'Gagal memperbarui data.', 'error');
    }
  };

  const filteredData = siswaData.filter((siswa) =>
    Object.values(siswa).some((value) =>
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
        <h3 className="card-title">Data Siswa</h3>
      </div>

      <div className="card-body">
        <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="dt-buttons btn-group flex-wrap">
                <NavLink
                  to="/dashboard/data_siswa/add"
                  className="btn btn-primary p-2"
                  tabIndex="0"
                  aria-controls="example1"
                  type="button"
                >
                  <span>Tambah Siswa</span>
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
                  <tr>
                    <th>Nama</th>
                    <th>Tempat lahir</th>
                    <th>Tanggal Lahir</th>
                    <th>Jenis Kelamin</th>
                    <th>Alamat</th>
                    <th>Nama Sekolah</th>
                    <th>Jenjang</th>
                    <th>Kelas</th>
                    <th>Nama Orangtua</th>
                    <th>No Handphone</th>
                    <th>Kekurangan</th>
                    <th>Harapan Siswa</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData && displayData.length === 0 ? (
                    <tr>
                      <td colSpan="13" className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    displayData &&
                    displayData.map((siswa) => (
                      <tr key={siswa.id}>
                        <td>{siswa.nama}</td>
                        <td>{siswa.tempat_lahir}</td>
                        <td>{siswa.tanggal_lahir}</td>
                        <td>{siswa.jenis_kelamin}</td>
                        <td>{siswa.alamat}</td>
                        <td>{siswa.nama_sekolah}</td>
                        <td>{siswa.jenjang}</td>
                        <td>{siswa.kelas}</td>
                        <td>{siswa.nama_orangtua}</td>
                        <td>{siswa.no_handphone}</td>
                        <td>{siswa.kekurangan}</td>
                        <td>{siswa.harapan_siswa}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => handleShowEdit(siswa.id)}
                            className="me-2"
                          >
                            <MDBIcon far icon="edit" />
                          </Button>

                          <Button
                            variant="danger"
                            onClick={() => handleDelete(siswa.id)}
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
            <Form.Group controlId="formNama">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="nama"
                value={editData.nama || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formTempatLahir">
              <Form.Label>Tempat Lahir</Form.Label>
              <Form.Control
                type="text"
                name="tempat_lahir"
                value={editData.tempat_lahir || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formTanggalLahir">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control
                type="date"
                name="tanggal_lahir"
                value={editData.tanggal_lahir || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formJenisKelamin">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Control
                as="select"
                name="jenis_kelamin"
                value={editData.jenis_kelamin || ''}
                onChange={handleEditChange}
              >
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formAlamat">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                type="text"
                name="alamat"
                value={editData.alamat || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formNamaSekolah">
              <Form.Label>Nama Sekolah</Form.Label>
              <Form.Control
                type="text"
                name="nama_sekolah"
                value={editData.nama_sekolah || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formJenjang">
              <Form.Label>Jenjang</Form.Label>
              <Form.Control
                as="select"
                name="jenjang"
                value={editData.jenjang || ''}
                onChange={handleEditChange}
              >
                <option value="TK">TK</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="SMK">SMK</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formKelas">
              <Form.Label>Kelas</Form.Label>
              <Form.Control
                as="select"
                name="kelas"
                value={editData.kelas || ''}
                onChange={handleEditChange}
              >
                <option value="TK">TK</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formNamaOrangtua">
              <Form.Label>Nama Orangtua</Form.Label>
              <Form.Control
                type="text"
                name="nama_orangtua"
                value={editData.nama_orangtua || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formNoHandphone">
              <Form.Label>No Handphone</Form.Label>
              <Form.Control
                type="text"
                name="no_handphone"
                value={editData.no_handphone || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formKekurangan">
              <Form.Label>Kekurangan</Form.Label>
              <Form.Control
                type="text"
                name="kekurangan"
                value={editData.kekurangan || ''}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group controlId="formHarapanSiswa">
              <Form.Label>Harapan Siswa</Form.Label>
              <Form.Control
                type="text"
                name="harapan_siswa"
                value={editData.harapan_siswa || ''}
                onChange={handleEditChange}
              />
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
