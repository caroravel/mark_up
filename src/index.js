import React from "react";
import ReactDOM from "react-dom";
import Home from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Ingresar from "./Ingresar";
import Dropdown from "./dashboard";
import Navbar from "./pruebaNav";
import UserInfo from "./context";
import Campania from "./campania";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CrearCodigo from "./crearCodigo";
import IngresarCodigo from "./ingresarCodigo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);

function Root() {
  const [info, setInfo] = React.useState({
    Nombre: null,
    Apellido: null,
  });

  const [isAuth, setIsAuth] = React.useState(true);

  return (
    <>
      <UserInfo.Provider value={{ info, setInfo }}>
        {/* {<Navbar isAuthenticated = {isAuth} />} */}
        <Routes>
          <Route path="/home" element={<Home isAuth={isAuth} />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/ingresar"
            element={<Ingresar setIsAuth={setIsAuth} />}
          />
          <Route path="/dashboard" element={<Dropdown />} />
          <Route path="/paginaPrincipal" element={<paginaPrincipal />} />
          <Route path="/crearCodigo" element={<CrearCodigo />} />
          <Route path="/ingresarCodigo" element={<IngresarCodigo />} />
          <Route
            path="/campania"
            element={
              <DndProvider backend={HTML5Backend}>
                <Campania />
              </DndProvider>
            }
          />
        </Routes>
      </UserInfo.Provider>
    </>
  );
}
