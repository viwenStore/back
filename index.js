const express = require('express');
const app = express();
const cors = require('cors')
const port = 5000;
const routes = require('./routes/routes')

app.use(express.json());
app.use(cors())

routes(app)

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})
