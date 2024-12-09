const db = require("../db");

exports.createCliente = (cliente, callback) => {
    const query = 'INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)';
    db.query(query, [cliente.nome, cliente.email, cliente.senha], callback);
};

exports.getClienteByEmail = (email, callback) =>{
    db.query('SELECT * FROM clientes WHERE email = ?', [email], callback);
};