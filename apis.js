const express = require('express');
const db = require('./db')
const cors = require('cors')

const app = express();
const PORT = 3001;
app.use(cors())
app.use(express.json())

app.post('/register', (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname
    const password = req.body.password;
    const email = req.body.email;
    db.query('INSERT INTO usuario (Nombre, Apellido, contraseña, mail) VALUES (?,?,?,?)', [name, surname, password, email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(404).json({ error: true })
        }
        db.query('SELECT idUsuario, Nombre, Apellido, cliente_agencia FROM usuario WHERE mail = ? AND contraseña = ?', [email, password], (err, result) => {
            if (err) {
                return res.status(404).send({ error: true })
            }
            if (result.length > 0) {
                res.json(result[0])
            } else {
                console.log("Incorrecto")
            }
        })
    })
})

app.post('/login', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    db.query('SELECT idUsuario, Nombre, Apellido, cliente_agencia FROM usuario WHERE mail = ? AND contraseña = ?', [email, password], (err, result) => {
        if (err) {
            return res.status(404).send({ error: true })
        }
        if (result.length > 0) {
            res.json(result[0])
        } else {
            console.log("Incorrecto")
        }
    })
})

app.post('/registerCampaign', (req, res) => {
    const nombreCampaña = req.body.nombreCampaña
    const acc_token = req.body.acc_token;
    const idCampaña = req.body.idCampaña
    db.query('INSTER INTO campa (nombreCampaña, acc_token, idCampaña) VALUES (?,?)', [nombreCampaña, acc_token, idCampaña], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    })
})

// app.post('/insertData', (req,res)=>{
//     datos = {'spend':25}

//     db.query('INSTER INTO campaña (datos) VALUES (?)',[datos], (err,result)=>{
//         if(err){
//             console.log(err)
//         }
//         console.log(result)
//         })
// })

// app.post('/getData', (req,res)=>{
//   

//     db.query('SELECT (datos) FROM campaña', (err,result)=>{
//         if(err){
//             console.log(err)
//         }
//         console.log(result)
//         })
// })

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})