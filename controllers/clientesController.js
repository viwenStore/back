const clienteService = require('../services/clienteService');

exports.createCliente = async (req, res) => {
    try {
        const result = await clienteService.createCliente(req.body);
        res.status(201).json(result);
    } catch (err) {
        if (err.message === 'Cliente já existe') {
            res.status(409).send(err.message); 
        } else {
            res.status(500).send(err.message); 
        }
    }
};

exports.getClienteById = async (req, res) => {
    try {
        const result = await clienteService.getClienteById(req.body);
        if (!result) {
            res.status(404).send('Cliente não encontrado'); 
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).send(err.message); 
    }
};

exports.getAllClientes = async (req, res) => {
    try {
        const result = await clienteService.getAllClientes();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send(err.message); 
    }
};

exports.getClienteByEmail = async (req, res) => {
    try {
        const result = await clienteService.getClienteByEmail(req.body.email);
        if (!result) {
            res.status(404).send('Cliente não encontrado'); 
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(500).send(err.message); 
    }
};