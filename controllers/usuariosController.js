const usuariosService = require('../services/usuariosService');

exports.getAllUsuarios = async (req, res) => {
    try {
        const results = await usuariosService.getAllUsuarios();
        res.json(results);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.getUsuarioById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await usuariosService.getUsuarioById(id);
        res.json(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

