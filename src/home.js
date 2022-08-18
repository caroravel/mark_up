import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CrearCampania = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(false);
  };

  return (
    <>
      <button onClick={() => setShowPopup(true)}>Abrir</button>
      <PopUp open={showPopup} handleSubmit={handleSubmit} />
    </>
  );
};

const PopUp = ({ handleSubmit, open }) => {

  const [errorMessage, setErrorMessage] = useState("");

  const [nomCampaña, setnomCampaña] = useState("");

  const [accessToken, setaccessToken] = useState("");

  return (
    <div className={"popup" + (open ? " open" : "")}>
      <div className="Bienvenido">Bienvenido</div>

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
  );
};

export default CrearCampania;