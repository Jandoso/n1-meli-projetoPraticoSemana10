const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Conexão com Banco de Dados
mongoose.connect("mongodb://localhost:27017/clientes", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Conexão com banco de dados feita com sucesso");
});

module.exports = app;