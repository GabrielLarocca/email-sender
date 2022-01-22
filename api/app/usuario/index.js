const express = require('express');
const rotas = express.Router();

const controller = require('./controller');
const { body } = require("express-validator");

rotas.post('/login', controller.login);

rotas.post('/register', [
	body('nome').not().isEmpty(),
	body('email').isEmail(),
	body('password').isLength({ min: 6 })
], controller.registrar);

module.exports = rotas;
