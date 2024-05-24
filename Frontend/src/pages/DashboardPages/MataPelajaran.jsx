import axios from 'axios';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

export const MataPelajaran = () => {
  const [matapelajaranData, setMataPelajaranData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const itemsPerPage = 5;
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
          'http://127.0.0.1:8000/api/get-all-mata-pelajaran',
          config
        );

        const data = response.data.data || [];
        setMataPelajaranData(data);
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
          `http://127.0.0.1:8000/api/delete-mata-pelajaran/${id}`,
          config
        );
        const updatedMataPelajaranData = matapelajaranData.filter(
          (matapelajaran) => matapelajaran.id !== id
        );
        setMataPelajaranData(updatedMataPelajaranData);
        setTotalPages(
          Math.ceil(updatedMataPelajaranData.length / itemsPerPage)
        );
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
    const mata_pelajaran = matapelajaranData.find((s) => s.id === id);
    setEditData(mata_pelajaran);
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
        `http://127.0.0.1:8000/api/update-mata-pelajaran/${editData.id}`,
        editData,
        config
      );
      const updatedMataPelajaranData = matapelajaranData.map((mata_pelajaran) =>
        mata_pelajaran.id === editData.id ? editData : mata_pelajaran
      );
      setMataPelajaranData(updatedMataPelajaranData);
      handleCloseModal();
      Swal.fire('Success!', 'Data telah diperbarui.', 'success');
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire('Error!', 'Gagal memperbarui data.', 'error');
    }
  };

  const filteredData = matapelajaranData.filter((matapelajaran) =>
    Object.values(matapelajaran).some((value) =>
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
        <h3 className="card-title">Data Mata Pelajaran</h3>
      </div>

      <div className="card-body">
        <div id="example1_wrapper" className="dataTables_wrapper dt-bootstrap4">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="dt-buttons btn-group flex-wrap">
                <NavLink
                  to="/dashboard/data_mapel/add"
                  className="btn btn-primary p-2"
                  tabIndex="0"
                  aria-controls="example1"
                  type="button"
                >
                  <span>Tambah Mata Pelajaran</span>
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
                    <th>Nama Mapel</th>
                    <th>Jenjang</th>
                    <th>Kelas</th>
                    <th>Keterangan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData && displayData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No Data
                      </td>
                    </tr>
                  ) : (
                    displayData &&
                    displayData.map((matapelajaran) => (
                      <tr key={matapelajaran.id}>
                        <td>{matapelajaran.nama_mapel}</td>
                        <td>{matapelajaran.jenjang}</td>
                        <td>{matapelajaran.kelas}</td>
                        <td>{matapelajaran.keterangan}</td>
                        <td>
                          <Button
                            variant="warning"
                            onClick={() => handleShowEdit(matapelajaran.id)}
                            className="me-2"
                          >
                            <MDBIcon far icon="edit" />
                          </Button>

                          <Button
                            variant="danger"
                            onClick={() => handleDelete(matapelajaran.id)}
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
              <Form.Label>Nama Mapel</Form.Label>
              <Form.Control
                type="text"
                name="nama_mapel"
                value={editData.nama_mapel || ''}
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
            <Form.Group controlId="formKeterangan">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                type="text"
                name="keterangan"
                value={editData.keterangan || ''}
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
