// server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Para permitir solicitudes CORS desde el frontend
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Ruta para manejar el envío de correos
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;
    console.log('ee');
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Mensaje de ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Error al enviar el correo');
    }
    console.log('Email enviado: ' + info.response);
    res.status(200).send('Correo enviado exitosamente');
  });
});
console.log('eew');
// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
