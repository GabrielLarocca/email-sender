const express = require('express');
const rotas = express.Router();

const controller = require('./controller');
const { body } = require("express-validator");

rotas.post('/login', [
	body('email').isEmail(),
	body('token').not().isEmpty()
], controller.login);

rotas.post('/register', [
	body('nome').not().isEmpty(),
	body('email').isEmail(),
], controller.registrar);

module.exports = rotas;
