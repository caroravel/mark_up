const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "rootroot",
database:"proyecto2022" 
})
db.connect(function(err) {
    if (err) throw err;
    console.log("conectado a la bd :)")
    return;
});

module.exports = db;