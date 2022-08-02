const elementos = [
    {
        nombre: "Nacho",
        edad: "22",
        email: "nachovigilante@gmail.com"
    },
    {
        nombre: "Delfina",
        edad: "17",
        email: "delfibrun@gmail.com"
    },
    {
        nombre: "Carolina",
        edad: "17",
        email: "caroravel@gmail.com"
    },
    {
        nombre: "Ramiro",
        edad: "17",
        email: "ramybender@gmail.com"
    },

];

function Persona(props){
    return(
        <div>
            <h3>Nombre: </h3>
            <span>{props.nombre}</span>
            <h3>Edad: </h3>
            <span>{props.edad}</span>
            <h3>Email: </h3>
            <span>{props.email}</span>
        </div>
    );
}

function ToDoList(){
    return(
        <ul>
            { 
                elementos.map(function (e){
                    return <li>
                        <Persona nombre={e.nombre} edad={e.edad} email={e.email} />
                    </li>;
                })
            }
        </ul>
    );
}

<div>

</div>

export default ToDoList;