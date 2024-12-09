const produtosService = require('../services/produtosService');

exports.getAllProdutos = (req, res) => {
    produtosService.getAllProdutos((err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
};

exports.getProdutoById = (req, res) => {
    const id = req.params.id;
    produtosService.getProdutoById(id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
};

exports.updateStock = (req, res) => {
    const id = req.params.id;
    const newStock = req.body.qtd;

    produtosService.updateStock(id, newStock, (err, message) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(message);
        }
    });
};