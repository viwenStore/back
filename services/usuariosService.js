const Usuarios = require('../models/usuariosModel');

exports.getAllUsuarios = () => {
    return new Promise((resolve, reject) => {
        try {
            Usuarios.getAll((err, results) => {
                if (err) {
                    reject(new Error('Erro ao buscar usuários'));
                } else {
                    resolve(results);
                }
            });
        } catch (error) {
            reject(new Error('Erro inesperado ao buscar usuários'));
        }
    });
};

exports.getUsuarioById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            Usuarios.getById(id, (err, results) => {
                if (err) {
                    reject(new Error('Erro ao buscar usuário'));
                } else if (results.length === 0) {
                    reject(new Error('Nenhum usuário encontrado'));
                } else {
                    resolve(results[0]);
                }
            });
        } catch (error) {
            reject(new Error('Erro inesperado ao buscar usuário'));
        }
    });
};