import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Login.css"
import UserInfo from "./context";

const CrearCampania = () => {
  const context = React.useContext(UserInfo)
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
  };

  return (
    <>
      <span>hola {context.info.Nombre}</span>
      <button onClick={() => setShowPopup(true)}>+</button>
      <PopUp open={showPopup} handleSubmit={handleSubmit} />
    </>
  );
};

const PopUp = ({ handleSubmit, open }) => {

  const [errorMessage, setErrorMessage] = useState("");

  const [nomCampaña, setnomCampaña] = useState("");

  const [accessToken, setaccessToken] = useState("");

  const [idCampania, setidCampania] = useState("");

  return (
    <div className = "centrar-popup">
    <div className={"popup" + (open ? " open" : "")}>
      <div className="nuevaCampania">Nueva Campaña</div>

      <Form className="form" onSubmit={handleSubmit}>
        <div className="inputText">
          <Form.Group size="lg" controlId="nomCampaña">
            <Form.Control
              autoFocus
              type="text"
              value={nomCampaña}
              placeholder="nombre de la campaña"
              onChange={(e) => setnomCampaña(e.target.value)}
              className="input"
            />
          </Form.Group>
          <Form.Group size="lg" controlId="accesToken">
            <Form.Control
              autoFocus
              type="password"
              value={accessToken}
              placeholder="access token"
              onChange={(e) => setaccessToken(e.target.value)}
              className="input"
            />
          </Form.Group>
          <Form.Group size="lg" controlId="idCampania">
            <Form.Control
              autoFocus
              type="number"
              value={idCampania}
              placeholder="id campaña"
              onChange={(e) => setidCampania(e.target.value)}
              className="input"
            />
          </Form.Group>
        </div>

        <button className="botoncitoIngresar">
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
    </div>
  );  
};

<button>hola</button> 

export default CrearCampania;