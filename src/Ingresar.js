import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Login.css";
import validator from 'validator'

function Ingresar() {

    const [errorMessage, setErrorMessage] = useState('')

    const [email, setEmail] = useState("");
 
    const [password, setPassword] = useState("");

    function validateForm() {
  
      return email.length > 0 && password.length > 0;
  
    }
  
    function handleSubmit(event) {
  
      event.preventDefault();
  
    }
  


    return (
      
      <div className="Ingresar">
  
        <Form onSubmit={handleSubmit}>
  
          <Form.Group size="lg" controlId="email">
  
            <Form.Label>Email</Form.Label>
            <br></br>
            <Form.Control
  
              autoFocus
  
              type="email"
  
              value={email}
  
              onChange={(e) => setEmail(e.target.value)}
  
            />

            </Form.Group>
  
          <Form.Group size="lg" controlId="password">
  
            <Form.Label>Password</Form.Label>
            <br></br>
            <Form.Control
  
              type="password"
  
              value={password}
  
              onChange={(e) => setPassword(e.target.value)}
  
            />
  
          </Form.Group>

        <Link to="/login">Aún no tengo cuenta</Link>
        <br></br><br></br>
        <Link to="/">Ingresar</Link>
            
        </Form>
      </div>
  
    );
  
  }

  export default Ingresar;