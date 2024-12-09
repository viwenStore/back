const db = require('../db');

const createPedido = async (pedido) => {
    const { usuarioId, produtos, quantidade, valorPedido, status } = pedido;

    if (!Array.isArray(produtos) || produtos.length === 0) {
        throw new Error('A lista de produtos é inválida ou está vazia.');
    }

    const queryPedido = 'INSERT INTO pedidos (usuarioId, quantidade, valorPedido, status) VALUES (?, ?, ?, ?)';
    const queryProduto = 'INSERT INTO pedidos_produtos (pedidoId, produtoId, quantidade) VALUES ?';

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(queryPedido, [usuarioId, quantidade, valorPedido, status], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        const pedidoId = results.insertId;

        const values = produtos.map(produto => [pedidoId, produto.produtoId, produto.quantidade]);
        await new Promise((resolve, reject) => {
            db.query(queryProduto, [values], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        return pedidoId;
    } catch (error) {
        console.error('Erro ao criar pedido:', error.message);
        throw new Error('Erro ao criar pedido: ' + error.message);
    }
};

const getPedidoById = async (id) => {
    const queryPedido = `
        SELECT p.id, p.usuarioId, p.quantidade, p.valorPedido, p.status, pp.produtoId, pp.quantidade AS quantidadeProduto
        FROM pedidos p
        LEFT JOIN pedidos_produtos pp ON p.id = pp.pedidoId
        WHERE p.id = ?
    `;

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(queryPedido, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        return results;
    } catch (error) {
        throw new Error('Erro ao buscar pedido: ' + error.message);
    }
};

const getAllPedidos = async () => {
    const query = `
        SELECT id, usuarioId, quantidade, valorPedido, status
        FROM pedidos
    `;

    try {
        const pedidos = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        return pedidos;
    } catch (error) {
        console.error('Erro ao buscar todos os pedidos:', error.message);
        throw new Error('Erro ao buscar todos os pedidos: ' + error.message);
    }
};

const deletePedido = async (pedidoId) => {
    const query = 'DELETE FROM pedidos WHERE id = ?';

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(query, [pedidoId], (err, results) => {
                if (err) {
                    return reject(err);
                }

                if (results.affectedRows === 0) {
                    return resolve(null);
                }

                resolve(true);
            });
        });

        return results;
    } catch (error) {
        console.error('Erro ao deletar pedido:', error.message);
        throw new Error('Erro ao deletar pedido: ' + error.message);
    }
};

module.exports = {
    createPedido,
    getPedidoById,
    deletePedido,
    getAllPedidos,
};
