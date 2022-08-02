import React from "react";
import { Link } from "react-router-dom";


function Home (){
    return(
        <div>
            <h1>HOME</h1>
            <Link to="/ingresar">Ingresar</Link>
            <Link to="/login">Sign Up</Link>
            <Link to="/dashboard">dashboard</Link>
            <Link to="/pruebaNav">prueba nav</Link>
        </div>
    );
}

export default Home;