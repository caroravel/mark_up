import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import validator from 'validator'
import UserInfo from "./context";

function botonIngresar() {
}

function Ingresar({ setIsAuth }) {

  const context = React.useContext(UserInfo)

  const [errorMessage, setErrorMessage] = useState('')

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  const navigate = useNavigate()

  function handleSubmit(event) {

    event.preventDefault();

    fetch('http://localhost:3001/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
      ,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert("Usuario o contraseña incorrectos")
        } else {
          setIsAuth(true)
          context.setInfo(data)
          navigate("/home")
        }
      });

  }



  return (

    <div className="Ingresar">

      <div className="Bienvenido">Bienvenido</div>

      <Form className="form" onSubmit={handleSubmit}>
        <div className="inputText">

          <Form.Group size="lg" controlId="email">

            <Form.Control

              autoFocus

              type="email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              placeholder="E-mail"

              className="input email"

            />

          </Form.Group>

          <Form.Group size="lg" controlId="password">

            <Form.Control

              type="password"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              placeholder="Contraseña"

              className="input email"

            />

          </Form.Group>

        </div>

        <button className="botoncitoIngresar" onClick={botonIngresar}>
          <div className="palabraBotonCS">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </div>
        </button>

        <div className="PostaUltLinea">
          <Link to="/paginaPrincipal" className="YaTengoCuenta">Olvide mi contraseña.</Link>
          <Link to="/login" className="VolverAlInicio">No tengo usuario.</Link>
        </div>

      </Form>
    </div>

  );

}

export default Ingresar;