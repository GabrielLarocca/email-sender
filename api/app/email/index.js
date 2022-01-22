const express = require('express');
const rotas = express.Router();

const controller = require('./email');

rotas.post('/send-email', controller.sendEmail);

module.exports = rotas;
