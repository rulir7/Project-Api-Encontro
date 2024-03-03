const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 4000;

// Habilita o CORS para todas as origens
app.use(cors());

// Configura o body-parser para analisar corpos de requisições JSON
app.use(bodyParser.json());

// Middleware para logs de solicitação
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rota para manipular solicitações GET
app.get('/getRequest', (req, res) => {
    res.send("Hello, this is a successful GET request");
});

// Rota para manipular solicitações POST
app.post('/postRequest', (req, res) => {
    // Exibe os dados recebidos no console para fins de depuração
    console.log("Received data:", req.body);

    // Envie uma resposta indicando que os dados foram recebidos com sucesso
    res.send("Data received successfully");
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
