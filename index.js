const { Sequelize } = require('sequelize');
const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

const sequelize = new Sequelize("sequelize","root","1234", {
    host : "localhost",
    dialect : "mysql",
    port : 3306
})

async function connection() {
    try {
        await sequelize.authenticate();
        console.log("Conexion exitosa");
    }catch (err){
        console.log("Conexion fallida", err);
    }
}
connection();

module.exports = sequelize;

app.listen(port, () => { 
    console.log('Servidor corriendo en el puerto ', port)
})


require('./relaciones');
const usuario = require("./router/Usuario.router");
app.use("/Usuarios", usuario);
const publicacion = require("./router/Publicacion.router");
app.use("/Publicacion", publicacion);
const comentario = require("./router/Comentario.router");
app.use("/Comentario", comentario);


