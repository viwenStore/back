const pedidosService = require('../services/pedidosService');

const getAllPedidos = async (req, res) => {
    try {
        const pedidos = await pedidosService.getAllPedidos();
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao buscar todos os pedidos:', error.message);
        res.status(500).json({ message: 'Erro ao buscar todos os pedidos', error: error.message });
    }
};

const getPedidoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID do pedido inválido.' });
        }

        const pedido = await pedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({ message: 'Erro ao buscar pedido', error: error.message });
    }
};

const createPedido = async (req, res) => {
    try {
        const { usuarioId, produtos, quantidade, valorPedido } = req.body;

        if (!usuarioId || !Array.isArray(produtos) || produtos.length === 0 || !quantidade || !valorPedido) {
            return res.status(400).json({
                message: 'Dados inválidos. Certifique-se de enviar usuarioId, produtos, quantidade e valorPedido.'
            });
        }

        const produtosValidos = produtos.every(
            produto => produto.produtoId && produto.quantidade
        );

        if (!produtosValidos) {
            return res.status(400).json({
                message: 'Cada produto deve conter produtoId e quantidade.'
            });
        }

        const novoPedido = await pedidosService.criarPedido(req.body);
        res.status(201).json(novoPedido);
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ message: 'Erro ao criar pedido', error: error.message });
    }
};

const deletePedido = async (req, res) => {
    try {
        const { id } = req.params;

        // Verifica se o ID é válido
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID do pedido inválido.' });
        }

        const pedidoDeletado = await pedidosService.cancelarPedido(id);

        if (!pedidoDeletado) {
            return res.status(404).json({ message: 'Pedido não encontrado.' });
        }

        res.status(200).json({ message: 'Pedido deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar pedido:', error);
        res.status(500).json({ message: 'Erro ao deletar pedido.', error: error.message });
    }
};

module.exports = {
    getPedidoById,
    createPedido,
    deletePedido,
    getAllPedidos
};
