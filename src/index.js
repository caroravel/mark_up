import React from "react";
import  ReactDOM from "react-dom";
import Home from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Ingresar from "./Ingresar";
import Dropdown from "./dashboard";
import Navbar from "./pruebaNav";

const root = ReactDOM.createRoot( document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="ingresar" element={<Ingresar />} />
                <Route path="dashboard" element={<Dropdown />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)