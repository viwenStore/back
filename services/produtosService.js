// FILE: produtosService.js
const Produtos = require('../models/produtosModel');

exports.getAllProdutos = (callback) => {
    Produtos.getAll((err, results) => {
        if (err) {
            callback('Erro ao buscar produtos', null);
        } else {
            callback(null, results);
        }
    });
};

exports.getProdutoById = (id, callback) => {
    Produtos.getById(id, (err, results) => {
        if (err) {
            callback('Erro ao buscar produto', null);
        } else if (results.length == 0) {
            callback('Nenhum produto encontrado', null);
        } else {
            callback(null, results[0]);
        }
    });
};

exports.updateStock = (id, newStock, callback) => {
    Produtos.updateStock(id, newStock, (err, results) => {
        if (err) {
            callback('Erro ao atualizar estoque', null);
        } else if (results.affectedRows === 0) {
            callback('Produto não encontrado', null);
        } else {
            callback(null, 'Estoque atualizado com sucesso');
        }
    });
};