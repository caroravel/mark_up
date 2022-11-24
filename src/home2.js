import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./Login.css"
import UserInfo from "./context";

const Home2 = () => {
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

        <div className="sideBarNomyApe">
          <div className="sideBarNombre">
          {context?.info?.cliente_agencia === 0 ? "Cliente" : "Agencia"}
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
    fetch('http://localhost:3001/addCampaign', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
      ,
      body: JSON.stringify({
        token: accessToken,
        idUsuario: context.info.idUsuario,
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
        <div className="nuevaCampania">Unirse a una campaña</div>
        <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="accesToken">
              <Form.Control
                autoFocus
                type="password"
                value={accessToken}
                placeholder="access token"
                onChange={(e) => setaccessToken(e.target.value)}
                className="input2"
              />
            </Form.Group>
            <div className="botonesPopUp">
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

                <button type="button" className="botoncitoIngresar" onClick={() => setShowPopup(false)}>
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

export default Home2;