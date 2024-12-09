module.exports = function (app) {
    const usuarioController = require('../controllers/usuariosController.js');
    const produtoController = require('../controllers/produtosController.js');
    const pedidosController = require('../controllers/pedidosController.js');
    const clienteController = require('../controllers/clientesController.js');
    const { autenticar } = require('../middleware.js');

    // Rotas de usuário
    app.get('/usuarios', usuarioController.getAllUsuarios); // usuario admin
    app.get('/usuarios/:id', usuarioController.getUsuarioById); // usuario admin

    //Rotas de cliente
    app.post('/login', autenticar, clienteController.getClienteByEmail);
    app.post('/cadastro', clienteController.createCliente);

    // Rotas de produto
    app.get('/produtos', produtoController.getAllProdutos);
    app.get('/produtos/:id', produtoController.getProdutoById);
    app.put('/produtos/:id', produtoController.updateStock);

    // Rotas de pedidos
    app.get('/pedidos', pedidosController.getAllPedidos);
    app.get('/pedidos/:id', pedidosController.getPedidoById);
    app.post('/pedidos', pedidosController.createPedido);
    app.delete('/pedidos/:id', pedidosController.deletePedido);
};
