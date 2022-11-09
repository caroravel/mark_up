import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Login.css"
import UserInfo from "./context";

const CrearCampania = () => {
  const context = React.useContext(UserInfo)
  const [showPopup, setShowPopup] = useState(false);
  const [campañas, setCampañas] = useState([]);

  React.useEffect(() => {
    getCampaigns()
  }, [])

  function getCampaigns() {
    fetch('http://localhost:3001/' + context.info.idUsuario + "/verCampanasCliente")
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          //hay error
        } else {
          setCampañas(data)
        }
      });
  }

  return (
    <div className="home">
      <div className="sideBar">
        <div className="sideBarNomyApe">
          <div className="sideBarNombre">
            {context?.info?.Nombre} 
          </div>
          <div className="sideBarApellido">
            {context?.info?.Apellido}
          </div>
        </div>
      </div>
      <div className="sideBarLine"/>

      <div className="todasCampanias">
        {
          campañas.map((campaign) => {
            return <Link to="/campania" className="campania" ><div className="contenidoBotonCampania">{campaign.nombreCampaign}</div></Link>
          })
        }
        <button onClick={() => setShowPopup(true)} className = "botonMas">+</button>
        <PopUp open={showPopup} setShowPopup={setShowPopup} getCampaigns={getCampaigns} />
      {/*  <input type = "file"></input> */}
      </div>
    </div>
  );
};

const PopUp = ({ open, setShowPopup, getCampaigns }) => {

  const [errorMessage, setErrorMessage] = useState("");

  const [nomCampaña, setnomCampaña] = useState("");

  const [accessToken, setaccessToken] = useState("");

  const [idCampania, setidCampania] = useState("");

  const [archivo, setarchivo] = useState("");

  const context = React.useContext(UserInfo)

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/registerCampaign', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
      ,
      body: JSON.stringify({
        nombreCampaña: nomCampaña,
        acc_token: accessToken,
        idCampaña: idCampania,
        idUsuario: context.info.idUsuario
      })
    })
      .then(response => response.json())
      .then(data => {
        getCampaigns()
      });
    setShowPopup(false);
  };

  
  return (
    <div className="centrar-popup">
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
          <div className="botonesPopUp">
          <button className="botoncitoIngresar">
            <div className="palabraBotonCS">
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                />
                <line x1="10" y1="10" x2="120" y2="120"
                stroke-width="10" stroke="RoyalBlue" />
  <line x1="10" y1="120" x2="120" y2="10"
        stroke-width="10" stroke="Gold" />
              </svg>
            </div>
          </button>

          <button className="botoncitoIngresar">
          <div className="palabraBotonCS">
            X
          </div>
          </button>
          </div>
        </Form>
      </div>
    </div>
  );
};


<button>hola</button>

export default CrearCampania;