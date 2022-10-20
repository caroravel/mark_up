//hola

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
    db.query('INSERT INTO usuario (Nombre, Apellido, password, mail) VALUES (?,?,?,?)', [name, surname, password, email], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(404).json({ error: true })
        }
        db.query('SELECT idUsuario, Nombre, Apellido, cliente_agencia FROM usuario WHERE mail = ? AND password = ?', [email, password], (err, result) => {
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
    db.query('SELECT idUsuario, Nombre, Apellido, cliente_agencia FROM usuario WHERE mail = ? AND password = ?', [email, password], (err, result) => {
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
    db.query('INSERT INTO campaign (nombreCampaign, acc_token, idCampaign) VALUES (?,?,?)', [nombreCampaña, acc_token, idCampaña], (err, result) => {
        if (err) {
            return res.json({error:true})
        }
        res.json({error:false})
    })
})

// app.post('/insertData', (req,res)=>{
//     datos = {'spend':25}

//     db.query('INSERT INTO campaña (datos) VALUES (?)',[datos], (err,result)=>{
//         if(err){
//             console.log(err)
//         }
//         console.log(result)
//         })
// })


app.post("/AgregarCliente", (req,res)=>{
    const cliente = req.body.cliente
    const idUsuario = req.body.idUsuario
    db.query('SELECT Nombre FROM usuario', (err,result)=>{
        if(err){
            return res.status(404).send({ error: true })
        }
        if (json(result[0]) == cliente){
            db.query('INSERT INTO campaña (clientes) VALUES (?) WHERE idUsuario = ?',[cliente, idUsuario], (err,result)=>{
                if(err){
                    return res.status(404).send({ error: true })
                }
                res.json(result[0])
            })
        }
    })
})
    
app.post("/verCampañasCliente", (req, res)=>{
    const cliente = req.body.cliente
    db.query('SELECT (idCampaign) FROM campaign WHERE clientes = ?',[cliente], (err,result)=>{
        if(err){
            return res.status(404).send({ error: true })
        }
        res.json(result[0])
        })
}
)


app.get('/getData', (req, res) => {
    db.query('SELECT * FROM campaign', (err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result)
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})