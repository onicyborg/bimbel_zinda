import { Routes, Route, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import Cookies from 'universal-cookie';
import Navbar from './component/NavbarComponent copy.jsx';
import FooterComponent from './component/FooterComponent copy.jsx';

import Homepages from './pages/Homepages';
import Classpages from './pages/Classpages';
import Faqpages from './pages/Faqpages';
import SyaratKetenpage from './pages/SyaratKetenPage.jsx';
import login from './pages/Login';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Lainnyapages from './pages/Lainnnyapages';
import Registrasi from './pages/Registrasi';
import Datasiswa from './pages/Datasiswa.jsx';
import { AuthProvider } from './context/auth.context.jsx';
import Datatentor from './pages/Datatentor.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DashboardLayout from './DashboardLayout.jsx';
import { PrivateRoute } from './component/PrivateRoutes.jsx';
import MainLayout from './MainLayout.jsx';
import { Siswa } from './pages/DashboardPages/Siswa.jsx';
import { Tentor } from './pages/DashboardPages/Tentor.jsx';
import { DashboardNavbar } from './component/Dashboard/DashboardNavbar.jsx';
import { Sidebar } from './component/Dashboard/Sidebar.jsx';
import { Jadwal } from './pages/DashboardPages/Jadwal.jsx';
import { MataPelajaran } from './pages/DashboardPages/MataPelajaran.jsx';
import { CookiePage } from './pages/cookies.jsx';
import { AddSiswa } from './pages/DashboardPages/AddSiswa.jsx';
import { AuthContext } from './context/auth.context-copy.jsx';
import { AddTentor } from './pages/DashboardPages/AddTentor.jsx';
import { AddJadwal } from './pages/DashboardPages/AddJadwal.jsx';
import { Playground } from './Playground.jsx';
import { AddMapel } from './pages/DashboardPages/AddMapel.jsx';
import { NotFound } from './NotFound.jsx';
import { testimonial } from './data/index.js';

function App() {
  const [isAuth, setIsAuth] = useState();
  const [dashboard, setDashboard] = useState();

  const auth = useContext(AuthContext);
  const location = useLocation();
  useEffect(() => {
    const renderPage = () => {
      setDashboard(location.pathname.includes('/dashboard'));
    };
    renderPage();
  }, [location.pathname]);

  return (
    <>
      <AuthProvider>
        {dashboard ? (
          <DashboardLayout>
            <Routes>
              {/* <Route path="/dashboard" Component={Dashboard}/> */}
              <Route path="dashboard/data_siswa/index" Component={Siswa} />
              <Route path="/dashboard/data_tentor/index" Component={Tentor} />
              <Route path="/dashboard/data_jadwal/index" Component={Jadwal} />
              <Route
                path="/dashboard/data_mapel/index"
                Component={MataPelajaran}
              />
              <Route path="/dashboard/data_siswa/add" Component={AddSiswa} />
              <Route path="/dashboard/data_tentor/add" Component={AddTentor} />
              <Route path="/dashboard/data_jadwal/add" Component={AddJadwal} />
              <Route path="/dashboard/data_mapel/add" Component={AddMapel} />
              <Route path="/dashboard/tescookie" Component={CookiePage} />
              <Route path="*" Component={NotFound} />
            </Routes>
          </DashboardLayout>
        ) : (
          <MainLayout>
            <Navbar />
            <Routes>
              <Route path="/" Component={Homepages} />
              <Route path="/Class" Component={Classpages} />
              <Route path="/Faq" Component={Faqpages} />
              <Route path="/Syaratketen" Component={SyaratKetenpage} />
              <Route path="/login" Component={login} />
              <Route path="/Contact" Component={Contact} />
              <Route path="/Profile" Component={Profile} />
              <Route path="/Registrasi" Component={Registrasi} />
              <Route path="/Lainnya" Component={Lainnyapages} />
              <Route path="/DataSiswa" Component={Datasiswa} />
              <Route path="/DataTentor" Component={Datatentor} />
              <Route path="/playground" Component={Playground} />
              <Route path="/Testimonial" Component={testimonial} />
              <Route path="*" Component={NotFound} />
            </Routes>
            <FooterComponent />
          </MainLayout>
        )}
      </AuthProvider>
    </>
  );
}

export default App;
