const Cliente = require('./models/clienteModel.js');

exports.autenticar = async (req, res, next) => {
    const { email, senha } = req.body;

    try {
        const cliente = await new Promise((resolve, reject) => {
            Cliente.getClienteByEmail(email, (err, results) => {
                if (err) {
                    return reject(new Error('Erro ao buscar cliente'));
                }
                resolve(results[0]);
            });
        });

        if (!cliente || cliente.senha !== senha) {
            return res.status(401).send('Usuário ou senha inválidos');
        }

        next();
    } catch (error) {
        res.status(500).send('Erro interno do servidor');
    }
};