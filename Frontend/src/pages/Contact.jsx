import React, { useState, setContactInfo } from 'react';
// import { } from "../dist/css/main.css";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    phoneNumber: '62878-3962-2557',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Informasi Kontak:', contactInfo);
    
    window.location.href = `https://wa.me/${contactInfo.phoneNumber.replace(/\D/g, '')}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='text-center py-5'>
        <button type="submit" class="btn btn-primary btn-lg btn-block">klik disini!</button>
      </div>
    </form>
  );
};

export default Contact;
