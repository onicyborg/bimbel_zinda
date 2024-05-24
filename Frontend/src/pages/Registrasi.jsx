import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "../dist/css/main.css";

const Registrasi = () => {

  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")

  const [validation, setValidation] = useState([])

  const history = useNavigate();

  const url = "http://localhost:8000/api/register"

  const registerHandler = async (e)=>{
    e.preventDefault()

    const formData = new FormData();

    formData.append('name', nama)
    formData.append('email', email)
    formData.append('username', username)
    formData.append('phoneNumber', phoneNumber)
    formData.append('password', password)
    formData.append('password_confirmation', passwordConfirmation)

    console.log(formData);
    await axios.post(url, formData)
    .then((response)=>{
      console.log(response);
      // history.push("/")
    })
    .catch((error)=>{
      setValidation(error.response.data)
      console.log(error);
    })
  }

  return (
    <Container>
      <Row>
        <Col>
        <h3>Tertarik untuk mendaftar</h3>
        </Col>
      </Row>
      {/* <div className="title fw-bold text-center py-2">Formulir Registrasi</div>
      <div className='content'>
        <form onSubmit={registerHandler}>
          <div className='user-details'>
            <div className='input-box'>
              <span className='details'>Nama Lengkap</span>
              <input type="text" value={nama} onChange={(e)=>setNama(e.target.value)} placeholder='' required />
            </div>
            {validation.name && (<div className="alert alert-danger">{validation.name[0]}</div>)}
            <div className='input-box'>
              <span className='details'>Username</span>
              <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='' required />
            </div>
            {validation.username && (<div className="alert alert-danger">{validation.username[0]}</div>)}
            <div className='input-box'>
              <span className='details'>Email</span>
              <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)} placeholder='' required />
            </div>
            {validation.email && (<div className="alert alert-danger">{validation.email[0]}</div>)}
            <div className='input-box'>
              <span className='details'>No Handphone</span>
              <input type="text" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='' required />
            </div>
            {validation.phoneNumber && (<div className="alert alert-danger">{validation.phoneNumber[0]}</div>)}
            <div className='input-box'>
              <span className='details'>Password</span>
              <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='' required />
            </div>
            {validation.name && (<div className="alert alert-danger">{validation.name[0]}</div>)}
            <div className='input-box'>
              <span className='details'>Konfirmasi Password</span>
              <input type="text" value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)} placeholder='' required />
            </div>
            {validation.passwordConfirmation && (<div className="alert alert-danger">{validation.passwordConfirmation[0]}</div>)}
            <div className="text-center mx-auto">
              <input type="submit" className="btn btn-primary"/>
              <div className="mt-3 justify text-center">
                <p>Sudah memiliki akun? Silakan <a href="/login">Login</a></p>
              </div>
            </div>
          </div>
        </form>
      </div> */}
    </Container>
  );
};

export default Registrasi;