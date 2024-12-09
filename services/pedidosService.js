const pedidosModel = require('../models/pedidosModel');

const getAllPedidos = async () => {
    try {
        const pedidos = await pedidosModel.getAllPedidos();

        const pedidosComProdutos = await Promise.all(
            pedidos.map(async (pedido) => {
                const pedidoDetalhado = await pedidosModel.getPedidoById(pedido.id);

                const produtos = pedidoDetalhado.map(row => ({
                    produtoId: row.produtoId,
                    quantidade: row.quantidadeProduto,
                }));

                return {
                    id: pedido.id,
                    usuarioId: pedido.usuarioId,
                    quantidade: pedido.quantidade,
                    valorPedido: pedido.valorPedido,
                    status: pedido.status,
                    produtos,
                };
            })
        );

        return pedidosComProdutos;
    } catch (error) {
        throw new Error('Erro ao buscar todos os pedidos: ' + error.message);
    }
};

const getPedidoById = async (pedidoId) => {
    try {
        const rows = await pedidosModel.getPedidoById(pedidoId);

        if (rows.length === 0) {
            return null;
        }

        const { id, usuarioId, quantidade, valorPedido, status } = rows[0];
        const produtos = rows.map(row => ({
            produtoId: row.produtoId,
            quantidade: row.quantidadeProduto
        }));

        return {
            id,
            usuarioId,
            quantidade,
            valorPedido,
            status,
            produtos
        };
    } catch (error) {
        throw new Error('Erro ao buscar pedido: ' + error.message);
    }
};

const criarPedido = async (body) => {
    const pedido = {
        usuarioId: body.usuarioId,
        produtos: body.produtos, 
        quantidade: body.quantidade,
        valorPedido: body.valorPedido,
        status: 'novo',
    };

    try {
        const pedidoId = await pedidosModel.createPedido(pedido);
        return { id: pedidoId, ...pedido };
    } catch (error) {
        console.error('Erro inesperado ao criar pedido:', error.message);
        throw new Error('Erro inesperado ao criar pedido: ' + error.message);
    }
};

const cancelarPedido = async (pedidoId) => {
    try {
        const pedidoDeletado = await pedidosModel.deletePedido(pedidoId);

        if (!pedidoDeletado) {
            return null;
        }

        return pedidoDeletado;
    } catch (error) {
        console.error('Erro ao cancelar pedido:', error.message);
        throw new Error('Erro ao cancelar pedido: ' + error.message);
    }
};

module.exports = {
    getPedidoById,
    criarPedido,
    cancelarPedido,
    getAllPedidos
};
    