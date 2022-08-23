import React from "react";
import ReactDOM from "react-dom";
import Home from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Ingresar from "./Ingresar";
import Dropdown from "./dashboard";
import Navbar from "./pruebaNav";
import UserInfo from "./context";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>

            <Root />

        </BrowserRouter>
    </React.StrictMode>
)

function Root() {

    const [info, setInfo] = React.useState({
        Nombre: null,
        Apellido: null,
    })

    return (
        <>
            <UserInfo.Provider value={{ info, setInfo }}>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/ingresar" element={<Ingresar />} />
                    <Route path="/dashboard" element={<Dropdown />} />
                    </Routes>
            </UserInfo.Provider>

        </>
    )
}