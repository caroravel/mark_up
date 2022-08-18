import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./pruebaNav";
import Home from "./home"

function App (){
    const [isAuth, setIsAuth] = useState(true);
    return(
        <div>
            <Navbar/>
            {
                isAuth ? <Home /> : <></>
            }
            
        </div>
    );
}

export default App;