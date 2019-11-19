const Clientes = require('../models/clientes');

exports.get = (req, res) => {
    Clientes.find(function(err, clientes){
        if(err) res.status(500).send(err);
        res.status(200).send(clientes);
    });
};

exports.getBuyers = (req, res) => {
    Clientes.find(function (err, clientes){
        if(err) res.status(500).send(err)

        const compradores = clientes.filter(cliente => cliente.comprou == true);

        res.status(200).send(compradores);
    });
};

exports.getByCpf = (req, res) => {
    Clientes.find(function (err, clientes){
        if(err) res.status(500).send(err)

        const cpf = req.params.cpf;
        const compradorPorCpf = clientes.find(cliente => cliente.cpf == cpf);

        res.status(200).send(compradorPorCpf);
    });
};

exports.post = (req, res) => {
    const cliente = new Clientes(req.body);

    cliente.save(function(err) {
        if(err) res.status(500).send(err);
        res.status(201).send({
            "status": true,
            "mensagem": "Aluna incluida com sucesso"
        });
    });
};
