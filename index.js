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


