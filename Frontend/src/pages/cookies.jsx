import Cookies from "universal-cookie";

export const CookiePage = ()=>{
const  cookies = new Cookies();
console.log(cookies.getAll().name);

return(
    <></>
)
}