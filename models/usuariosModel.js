const db = require("../db");

exports.getAll = (callback) =>{
db.query('SELECT * FROM usuarios', callback)
}

exports.getById = (id, callback) =>{
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
};

