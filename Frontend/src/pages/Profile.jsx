import React, { useState } from 'react';
// import '../dist/css/main.css';

const Profile = ({ handleLogout }) => {
  const initialUserState = {
    name: 'anissa',
    email: 'anisa@gmail.com',
    alamat: 'jakarta selatan',
    no_handphone: '087676454256',
  };

  const [user, setUser] = useState(initialUserState);
  const [editing, setEditing] = useState(false); // State untuk menentukan apakah sedang dalam mode edit

  const updateUser = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setEditing(true); // Mengaktifkan mode edit
  };

  const handleSave = () => {
    setEditing(false); // Menonaktifkan mode edit
    // Logika untuk menyimpan perubahan ke database atau melakukan tindakan lainnya
  };

  const handleCancel = () => {
    setEditing(false); // Menonaktifkan mode edit
    setUser(initialUserState); // Mengembalikan data pengguna ke data awal
  };

  return (
    <div className="container profile-container">
      <h1 className="text-center mb-4">Profil Pengguna</h1>
      <div className="profile-item">
        <label>Nama: </label>
        {editing ? (
          <input
            type="text"
            value={user.name}
            onChange={(e) => updateUser('name', e.target.value)}
            className="input-field"
          />
        ) : (
          <div>{user.name}</div>
        )}
      </div>
      <div className="profile-item">
        <label>Email: </label>
        {editing ? (
          <input
            type="email"
            value={user.email}
            onChange={(e) => updateUser('email', e.target.value)}
            className="input-field"
          />
        ) : (
          <div>{user.email}</div>
        )}
      </div>
      <div className="profile-item">
        <label>Alamat: </label>
        {editing ? (
          <input
            type="text"
            value={user.alamat}
            onChange={(e) => updateUser('alamat', e.target.value)}
            className="input-field"
          />
        ) : (
          <div>{user.alamat}</div>
        )}
      </div>
      <div className="profile-item">
        <label>No. Handphone: </label>
        {editing ? (
          <input
            type="text"
            value={user.no_handphone}
            onChange={(e) => updateUser('no_handphone', e.target.value)}
            className="input-field"
          />
        ) : (
          <div>{user.no_handphone}</div>
        )}
      </div>
      <div className="profile-item">
        {editing ? (
          <div>
            <button onClick={handleSave} className="btn btn-primary me-2">Edit</button>
          </div>
        ) : (
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleCancel} className="btn btn-danger">Batal</button>
            <span style={{ marginLeft: '10px' }}></span> {/* Tambahkan jarak horizontal di sini */}
            <button onClick={handleEdit} className="btn btn-primary">Simpan</button>
          </div>

        )}
      </div>
    </div>
  );
};

export default Profile;