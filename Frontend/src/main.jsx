import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from './component/ScrollToTop.jsx';
import MainLayout from './MainLayout.jsx';
import { Routes, Route } from 'react-router-dom';
import Homepages from "./pages/Homepages";
import Classpages from "./pages/Classpages";
import Faqpages from "./pages/Faqpages";
import login from "./pages/Login";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Lainnyapages from "./pages/Lainnnyapages";
import Registrasi from "./pages/Registrasi";
import Datasiswa from "./pages/Datasiswa.jsx"
import Datatentor from "./pages/Datatentor.jsx";


// import "./dist/css/main.css";
import "animate.css";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

import NavbarComponent from "./component/NavbarComponent.jsx"
import FooterComponent from "./component/FooterComponent.jsx"
AOS.init();

import{BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/auth.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollToTop/>
    <App />
    </BrowserRouter>
  </React.StrictMode>,
)
