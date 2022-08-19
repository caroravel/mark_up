import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import validator from 'validator'
import Fondo from './diseñosPedro/images/rectangle_1.png'
import Navbar from "./pruebaNav";

function Login() {

  const navigate = useNavigate()

  const checkboxes = {
    c1: false,
    c2: false,
    c3: false,
    selected: null,
  }
  const [errorMessage, setErrorMessage] = useState('')

  const [email, setEmail] = useState("");

  const [cliente, setCliente] = useState("");

  const [agencia, setAgencia] = useState("");

  const [name, setName] = useState("");

  const [surname, setSurname] = useState("");

  const [password, setPassword] = useState("");

  const [confPassword, setconfPassword] = useState("");

  var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

  function validateForm() {

    return email.length > 0 && password.length > 0;

  }

  function handleSubmit(event) {

    event.preventDefault();

  }

  function botonCrearSesion() {
    if (password != confPassword) {
      alert("Las contraseñas no coinciden");
    }
    else if (password.length < 8) {
      alert("La contraseña debe tener como mínimo 8 caracteres")
    }
    else if (validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      navigate("/home")
    }
    else {
      alert('La contraseña debe incluir al menos 1 caracter especial, una letra minúscula y una letra mayúscula')
    }
  }

  const Navbar = () => {
    return(
        <div>
        <Navbar/>
        </div>
    )
  }


  return (

    <div className="Login">
      <div className="registrarse">Registrarse</div>

      <Form onSubmit={handleSubmit} className="form">

        <div className="inputText">

          <div className="NomYApe">

            <Form.Group className="Nombre" size="lg" controlId="Name">
              <Form.Control

                type="text"

                value={name}

                onChange={(e) => setName(e.target.value)}

                placeholder="Nombre"

                className="input"
              />

            </Form.Group>

            <Form.Group className="Apellido" size="lg" controlId="Surname">
              <Form.Control

                type="text"

                value={surname}

                onChange={(e) => setSurname(e.target.value)}

                placeholder="Apellido"

                className="input"
              />

            </Form.Group>

          </div>

          <Form.Group className="Email" size="lg" controlId="email">
            <Form.Control

              autoFocus

              type="email"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              placeholder="E-mail"

              className="input email"
            />

          </Form.Group>

          <div className="ContraYConf">

            <Form.Group className="Contraseña" size="lg" controlId="password">
              <Form.Control

                type="password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

                placeholder="Contraseña"

                className="input"
              />

            </Form.Group>

            <Form.Group className="ConfContraseña" size="lg" controlId="ConfPassword">

              <Form.Control

                type="password"

                value={confPassword}

                onChange={(e) => setconfPassword(e.target.value)}

                placeholder="Conf. contraseña"

                className="input"
              />

            </Form.Group>

          </div>
        </div>

        <div className="ultimalinea">
          <div className="checkboxes">
            <div className="checkbox"><input type="radio" name="clienteOAgencia" value={cliente} /><div className = "palabraCheck">Cliente</div></div>
            <div className="checkbox"><input type="radio" name="clienteOAgencia" value={agencia} /><div className = "palabraCheck">Agencia</div></div>
          </div>

          <button className="botoncitoCrearSesion" onClick={botonCrearSesion}>
            <div className="palabraBotonCS">
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </div>
          </button>
        </div>

        <div className = "PostaUltLinea">
        <Link to="/ingresar" className="YaTengoCuenta">Ya tengo cuenta</Link>
        <Link to="/ingresar" className="VolverAlInicio">Volver al inicio</Link>
        </div>

      </Form>
    </div>


  );

}

export default Login;