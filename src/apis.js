const express = require('express');
const db = require('./db')
const cors = require('cors')

const app = express();
const PORT = 3002;

app.post('/register', (req,res)=>{
    const nombre = req.body.nombre;
    const contraseña = req.body.contraseña;
    const mail = req.body.mail;
    db.query('INSTER INTO usuario (nombre, contraseña, mail) VALUES (?,?)',[nombre, contraseña, mail], (err,result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        })
})

app.post('/login', (req,res)=>{
    const contraseña = req.body.contraseña;
    const mail = req.body.mail;
    db.query('SELECT (mail, contraseña) FROM usuario WHERE mail = ? AND contraseña = ?',[mail, contraseña], (err,result)=>{
        if(err){
            console.log(err)
        }
        if (result.length > 0){
            console.log(result);
        } else{
            console.log("Incorrecto")
        }
        })
})

app.post('/registerCampaign', (req,res)=>{
    const nombreCampaña = req.body.nombreCampaña
    const acc_token = req.body.acc_token;
    const idCampaña = req.body.idCampaña
    db.query('INSTER INTO campaña (nombreCampaña, acc_token, idCampaña) VALUES (?,?)',[nombreCampaña, acc_token, idCampaña], (err,result)=>{
        if(err){
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

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})