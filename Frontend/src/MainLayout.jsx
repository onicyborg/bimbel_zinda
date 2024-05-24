import React from "react"
import NavbarComponent from "./component/NavbarComponent copy"
import FooterComponent from "./component/FooterComponent copy"
import "../main.css"
import "bootstrap/dist/css/bootstrap.min.css"

const MainLayout = ({children})=>(
    
    <div>
        {children}
    </div>
)



export default MainLayout