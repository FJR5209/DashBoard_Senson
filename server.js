const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3001;

// Habilitar CORS
app.use(cors());

// Configuração do transportador de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'suportetcc5209@gmail.com', // Seu e-mail
        pass: 'kual aods ikgt msww' // Senha específica para aplicativos
    }
});

// Validação da configuração do transportador
transporter.verify((error, success) => {
    if (error) {
        console.error('Erro ao configurar o transporte de e-mail:', error);
    } else {
        console.log('Transportador de e-mail configurado com sucesso');
    }
});

// Rota para enviar o alerta por e-mail
app.get('/send-email', (req, res) => {
    const temperature = req.query.temperature; // Obtém a temperatura do query string

    if (!temperature || isNaN(temperature)) {
        return res.status(400).json({ error: 'Temperatura inválida ou não fornecida' });
    }

    const mailOptions = {
        from: 'suportetcc5209@gmail.com', // Remetente
        to: 'juniorfredson5209@gmail.com', // Destinatário
        subject: 'Alerta de Temperatura Alta',
        text: `A temperatura registrada foi de ${temperature} °C, que está acima do limite!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error);
            return res.status(500).json({ error: 'Erro ao enviar o e-mail', details: error.message });
        }
        console.log('E-mail enviado:', info.response);
        res.json({ message: 'E-mail enviado com sucesso!', info: info.response });
    });
});

// Inicia o servidor na porta 3001
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
