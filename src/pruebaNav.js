import "./StyleNavbar.css"
import {NavLink} from "react-router-dom"
export default function Navbar(){


    return(
        <div className = "navcontenedor">
           <NavLink className = {({isActive}) => (isActive? "activo":"desactivo")} to ="/ingresar">Sign In</NavLink>
           <NavLink className = {({isActive}) => (isActive? "activo":"desactivo")} to ="/login">sign Up</NavLink>
        </div>
    )
}