import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import UserInfo from "./context";

const IngresarCodigo = () => {
  const navigate = useNavigate();

  const [Empresa, setEmpresa] = useState();
  const [codigo, setCodigo] = useState();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/home")
  }

  function botonIngresar() {
    
  }

  return (
    <div className="Ingresar">
      <div className="IniciarEmpresa">Ingresá tu empresa</div>

      <Form className="form" onSubmit={handleSubmit}>
        <div className="inputText">
          <Form.Group size="lg" controlId="Empresa">
            <Form.Control
              autoFocus
              type="text"
              value={Empresa}
              placeholder="Ingrese el nombre de la empresa"
              className="input email"
              required
            />
          </Form.Group>

          <Form.Group size="lg" controlId="Codigo">
            <Form.Control
              type="password"
              value={codigo}
              placeholder="Ingrese el código que le dio su empresa"
              className="input email"
              required
            />
          </Form.Group>

          <Form.Group size="lg" controlId="Codigo">
            <Form.Control
              type="password"
              value={codigo}
              placeholder="Confirmar código"
              className="input email"
              required
            />
          </Form.Group>
        </div>

        <button className="botoncitoIngresar" onClick={botonIngresar}>
          <div className="palabraBotonCS">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
              />
            </svg>
          </div>
        </button>
      </Form>
    </div>
  );
};

export default IngresarCodigo;
