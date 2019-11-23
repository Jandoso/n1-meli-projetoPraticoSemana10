const Clientes = require('../models/clientes');

// Rotas Get

exports.get = (req, res) => {
    Clientes.find(function(err, clientes){
        if(err) res.status(500).send(err);
        res.status(200).send(clientes);
    });
};

exports.getBuyers = (req, res) => {
    Clientes.find({ comprou: true }, function (err, clientes){
        if(err) res.status(500).send(err)

        const clientesRetorno = clientes.map(cliente => {
            return {
                nome: cliente.nome,
                email: cliente.email
            };
        });

        // const compradores = clientes.filter(cliente => cliente.comprou == true);


        res.status(200).send(clientesRetorno);
    });
};

exports.getByCpf = (req, res) => {
    const cpf = req.params.cpf;
    Clientes.find({ cpf : cpf }, function (err, cliente){
        if(err) res.status(500).send(err)

        // const compradorPorCpf = clientes.find(cliente => cliente.cpf == cpf);

        res.status(200).send(cliente);
    });
};

// Rotas Post

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


exports.alterarCliente = (req, res) => {

    if(!validaFormulario(req.body)) return res.status(400).send({ mensagem: "Campos inválidos" });

    Clientes.update(
        { _id: req.params.id},
        { $set: req.body },
        { upsert: true },
        function (err) {
            if (err) return res.status(500).send(err);
            res.status(200).send({ mensagem: "Atualizado com sucesso!" })
        }
    );
}; 

exports.deletarCliente = (req, res) => {
    const idCliente = req.params.id;

    Clientes.findById(idCliente, function(err, cliente){
        if(err) return res.status(500).send(err);

        if(!cliente) {
            return res.status(200).send({ mensagem: `Infelizmente não pudemos localizar o Cliente com id ${idCliente}` });
        }

        cliente.remove(function (err){
            if(!err){
                res.status(204).send({ mensagem: "Cliente removida com sucesso!" })
            }
        })
    })
}

const validaFormulario = (campos) => {
    const schema = {
        nome: Joi.string().min(1).required(),
        email: Joi.string().min(1).required()
    }
    const validation = Joi.validate(campos, schema)

    if(validation.erro){
        return false 
    }
    return true 
};

