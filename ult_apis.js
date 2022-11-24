const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const password = req.body.password;
  const email = req.body.email;
  const cliente_agencia = req.body.type
    db.query(
      "INSERT INTO usuario (Nombre, Apellido, password, mail, cliente_agencia) VALUES (?,?,?,?,?)",
      [name, surname, password, email, cliente_agencia],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(404).json({ error: true });
        }
        db.query(
          "SELECT idUsuario, Nombre, Apellido, cliente_agencia FROM usuario WHERE mail = ? AND password = ?",
          [email, password],
          (err, result) => {
            if (err) {
              return res.status(404).send({ error: true });
            }
            if (result.length > 0) {
              res.json(result[0]);
            } else {
              console.log("Incorrecto");
            }
          }
        );
      }
    );
  
});

app.post("/login", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  db.query(
    "SELECT idUsuario, Nombre, Apellido, cliente_agencia FROM usuario WHERE mail = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(404).send({ error: true });
      }
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        console.log("Incorrecto");
      }
    }
  );
});

app.post("/registerCampaign", (req, res) => {
  const nombreCampaña = req.body.nombreCampaña;
  const acc_token = req.body.acc_token;
  const idCampaña = req.body.idCampaña;
  const idUsuario = req.body.idUsuario;
  db.query(
    "SELECT cliente_agencia FROM usuario WHERE idUsuario = ? ",
    [idUsuario],
    (err, result) => {
      if (err) {
        return res.status(404).send({ error: true });
      }
      if (result.length > 0) {
        if (result[0].cliente_agencia == 1){
          db.query(
            "INSERT INTO campaign (nombreCampaign, acc_token, idCampaign) VALUES (?,?,?)",
            [nombreCampaña, acc_token, idCampaña],
            (err, result) => {
              if (err) {
                console.log(err);
                return res.json({ error: true });
              }
              db.query(
                "INSERT INTO `campaign-usuario` (idCampaign, idUsuario) VALUES (?,?)",
                [idCampaña, idUsuario],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return res.json({ error: true });
                  }
                  res.json({ error: false });
                }
              );
            }
          );
        }
        //res.json(result[0]);
      } else {
        console.log("Incorrecto");
      }
    
      
    }
   
  );

  
  
});

app.post('/insertData', (req,res)=>{
    datos = {'spend':25}
    const idCampaign = req.body.idCampaign
    db.query('UPDATE campaign SET datos = ? WHERE idCampaign = ?',[datos, idCampaign], (err,result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        })
})

app.post("/AgregarCliente", (req, res) => {
  // const cliente = req.body.cliente;
  // const idUsuario = req.body.idUsuario;
  // db.query("SELECT Nombre FROM usuario", (err, result) => {
  //   if (err) {
  //     return res.status(404).send({ error: true });
  //   }
  //   if (json(result[0]) == cliente) {
  //     db.query(
  //       "INSERT INTO campaña (clientes) VALUES (?) WHERE idUsuario = ?",
  //       [cliente, idUsuario],
  //       (err, result) => {
  //         if (err) {
  //           return res.status(404).send({ error: true });
  //         }
  //         res.json(result[0]);
  //       }
  //     );
  //   }
  // });
  const acc_token = req.body.acc_token
  const idUsuario = req.body.idUsuario;

  db.query(
    "SELECT cliente_agencia FROM usuario WHERE idUsuario = ? ",
    [idUsuario],
    (err, result) => {
      if (err) {
        return res.status(404).send({ error: true });
      }
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        console.log("Incorrecto");
      }
    }
   
  );
  if (result[0] == 1){
    db.query("SELECT idCampaign from campaign WHERE acc_token = ?", [acc_token],(err, result) => {
      if (err) {
        return res.status(404).send({ error: true });
      }
      if (result.length > 0) {
        res.json(result[0]);
      }
  
      
      db.query(
        "INSERT INTO `campaign-usuario` (idCampaign, idUsuario) VALUES (?,?)",
        [idCampaña, idUsuario],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.json({ error: true });
          }
          res.json({ error: false });
        }
      );
    })
  }
  
  
  


});

app.get("/:CLIENTE/verCampanasCliente", (req, res) => {
  const cliente = req.params.CLIENTE;
  db.query(
    "SELECT * FROM `campaign-usuario` INNER JOIN `campaign` on `campaign-usuario`.idCampaign = `campaign`.idCampaign WHERE idUsuario = ?",
    [cliente],
    (err, result) => {
      if (err) {
          console.log(err)
        return res.status(404).send({ error: true });
      }
      res.json(result);
    }
  );
});

app.get("/getData", (req, res) => {
  const idCampaign = req.query.idCampaign
  db.query("SELECT datos FROM campaign WHERE idCampaign = ?",[idCampaign], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result[0].datos);
  });
});

app.post("/addCampaign", (req, res) => {
  const accessToken = req.body.token
  const idUsuario = req.body.idUsuario
  if(!accessToken || !idUsuario) return res.json({error: true})
  db.query("SELECT idCampaign FROM campaign WHERE acc_token = ?", [accessToken], (err, result) => {
    db.query('INSERT INTO `campaign-usuario` (idCampaign, idUsuario) VALUES (?,?)', [result[0].idCampaign, idUsuario], (err, result) => {
      console.log(err)
      if(err) return res.json({error: true})
      res.json({error: false})
    })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});