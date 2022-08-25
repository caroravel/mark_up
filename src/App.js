import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./pruebaNav";
import Home from "./home"

function App ({isAuth}){
    return(
        <div>
            
            {
                isAuth ? <Home /> : <></>
            }
            
        </div>
    );
}

export default App;