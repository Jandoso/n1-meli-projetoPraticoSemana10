const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clientes = require('./routes/clientesRoute');

//Conexão com Banco de Dados
mongoose.connect("mongodb+srv://jandosoGeneral:01020304@omnistack-34kgb.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Conexão com banco de dados feita com sucesso");
});

app.use(function(req, res, next){
    res.header('Acess-Control-Allow-Origin', '*')
    res.header(
        "Acess-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
}); 

app.use(bodyParser.json());

app.use('/clientes', clientes);

module.exports = app;