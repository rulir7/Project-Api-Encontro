import express from "express";
import cors from "cors"; //serve para abrir as portas para as conexções
import * as dotenv from "dotenv";  //sistema para configuracao de ambientes ......  o arquivo .env, salva dados que nao ficam públicos do ambiente....
import { AnswerRouter } from "./answer/answer.router";
import * as nodemailer from 'nodemailer';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//email para configurar o nodemailer depois, deixei o do terra como exemplo..sem os dados....

const transporter = nodemailer.createTransport({
    host: "smtp.terra.com.br",
    port: 587,
    // secure: true,
    auth: {
        user: "email@terra.com.br",
        pass: "preencher"
    },
    requireTLS: true

});

const enviarEmail = async (destinatario: string, assunto: string, corpo: string) => {
    try {
        // Enviar o email
        await transporter.sendMail({
            from: 'email@terra.com.br',
            to: destinatario,
            subject: assunto,
            // text: corpo,
            html: corpo,
        });
        console.log('Email enviado com sucesso');
    } catch (error) {
        console.error('Erro ao enviar o email:', error);
    }
};

dotenv.config();


// para garantir que vai conectar na porta 4000 (esta no .env), porque se entrar em outra porta ele irá fechar a aplicação
if (!process.env.PORT) {
    process.exit(1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express();

// Habilita o CORS para todas as origens
app.use(cors())
// app.use(express.json())

const bodyParser = require('body-parser');

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

app.use("/api/answer", AnswerRouter);



// Inicia o servidor na porta especificada
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));