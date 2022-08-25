import "./StyleNavbar.css"
import {NavLink} from "react-router-dom"
//export default function Navbar(){
    //return(
//         <div className = "navcontenedor">
// <NavLink className = {({isActive}) => (isActive? "activo":"desactivo")} to ="/">Inicio</NavLink>
// <NavLink className = {({isActive}) => (isActive? "activo":"desactivo")} to ="/Login">Sign Up</NavLink>
// <NavLink className = {({isActive}) => (isActive? "activo":"desactivo")} to ="/Ingresar">Sign In</NavLink>
//         </div>
//     )
// }


const Navbar = ({ isAuthenticated }) => {
  return (
    <nav
      className={`autohide navbar navbar-expand-lg bg-white ${
        isAuthenticated ? "private-navbar" : ""
      }`}
    >
        {isAuthenticated ? (
          // Si esta autenticado
          <div className = "navcontenedor">
          <NavLink className = {({isActive}) => (isActive? "activo":"desactivo")} to ="/miUsuario">Mi Usuario</NavLink>
                  </div>
        ) : (
          // Si no esta autenticado
          <div className = "navcontenedor">
          <NavLink className = {({isActive}) => (isActive? "activo":"desactivo")} to ="/home">Inicio</NavLink>
          <NavLink className = {({isActive}) => (isActive? "activo":"desactivo")} to ="/">Sign Up</NavLink>
          <NavLink className = {({isActive}) => (isActive? "activo":"desactivo")} to ="/Ingresar">Sign In</NavLink>
                  </div>
        )}
    </nav>
    );
  };
export default Navbar;
