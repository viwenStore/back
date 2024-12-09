const Cliente = require('../models/clienteModel.js');

exports.createCliente = (cliente) => {
    return new Promise((resolve, reject) => {
        Cliente.createCliente(cliente, (err, results) => {
            if (err) {
                return reject(new Error('Erro ao criar cliente'));
            } else {
                resolve(results);
            }
        });
    });
};

exports.getClienteByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Cliente.getClienteByEmail(email, (err, results) => {
            if (err) {
                return reject(new Error('Erro ao buscar cliente'));
            } else {
                resolve(results);
            }
        });
    });
};