import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"; 
import { jwtDecode } from "jwt-decode";
import SideBarComponent from "../component/SideBarComponent"
import "admin-lte/dist/css/adminlte.min.css"
import "admin-lte/build/js/AdminLTE"
import { DashboardNavbar } from "../component/Dashboard/DashboardNavbar";
import { Sidebar } from "../component/Dashboard/Sidebar";
import { Tables } from "../component/Dashboard/Tables";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context-copy";
const Dashboard = ()=>{
  const navigate = useNavigate();
  const cookies = new Cookies();
  
  const auth = useContext(AuthContext);

  console.log(auth);
 const handleLogout = ()=>{
    cookies.remove('token');
    navigate("/login")
  }
    return(
        // <AuthProvider>
        // <div classNameNameName="dashboard">dashboard</div>
        // <h4>welcome {name}</h4>
        // <a  href="/logout" onClick={handleLogout}>Log Out</a>
        // </AuthProvider>
        <>
        
        <div className="wrapper">
        
        <div className="content-wrapper">

        <div className="content-header">
        <div className="container-fluid">
        <div className="row mb-2">
        <div className="col-sm-6">
        <h1 className="m-0">Starter Page</h1>
        </div>
        <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
        <li className="breadcrumb-item"><a href="#">Home</a></li>
        <li className="breadcrumb-item active">Starter Page</li>
        </ol>
        </div>
        </div>
        </div>
        </div>
        <Tables/>
        

        <div className="content">
        <div className="container-fluid">
        <div className="row">
        <div className="col-lg-6">
        </div>


        </div>

        </div>
        </div>

        </div>


        {/* <aside className="control-sidebar control-sidebar-dark">

        <div className="p-3">
        <h5>Title</h5>
        <p>Sidebar content</p>
        </div>
        </aside> */}


        <footer className="main-footer">

        <div className="float-right d-none d-sm-inline">
        Anything you want
        </div>

        <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
        </footer>
        </div>
        
</>
    )
}

export default Dashboard;