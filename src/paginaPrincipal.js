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

  const [errorMessage, setErrorMessage] = useState('')

  const [email, setEmail] = useState("");

  function validateForm() {

    return email.length > 0;

  }

  function handleSubmit(event) {

    event.preventDefault();

  }

  return (

    <div className="Login">
      <div className="registrarse">Recuperar contraseña</div>

      <Form onSubmit={handleSubmit} className="form">

        <div className="inputText">

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
        </div>
      </Form>
    </div>


  );

}

export default Login;