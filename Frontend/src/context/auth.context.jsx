import { createContext, useState } from "react";
import Cookies from "universal-cookie"
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [name, setName] = useState("")
    const cookies = new Cookies
    const handleLogout = () => {
        setIsLoggedIn(false);
        setName(cookies.get('name'))
    };
    const [isLoggedout, setIsLoggedout] = useState(true);
    const handleLoggedin = () => {
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, name}}>
            {children}
        </AuthContext.Provider>
    );
}

