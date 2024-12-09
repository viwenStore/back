const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'viewen_db'
})

db.connect((err)=>{
    if(err) {
        console.error('Erro ao conectar no banco de dados', err)
    }else{
        console.log('Conectado no banco de dados MYSQL com sucesso')
    }
})

module.exports = db;