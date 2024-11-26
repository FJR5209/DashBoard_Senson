const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Para permitir CORS, se necessário
const app = express();
const port = 3001;

app.use(cors());

// Configuração do transportador de e-mail (substitua com suas credenciais reais)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou qualquer outro serviço de e-mail
    auth: {
        user: 'suportetcc5209@gmail.com', // Seu e-mail
        pass: 'kual aods ikgt msww' // Sua senha do e-mail ou app password se for o Gmail
    }
});

// Rota para enviar o alerta por e-mail
app.get('/send-email', (req, res) => {
    const temperature = req.query.temperature; // Obtém a temperatura do query string

    if (!temperature) {
        return res.status(400).json({ error: 'Temperatura não fornecida' });
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
