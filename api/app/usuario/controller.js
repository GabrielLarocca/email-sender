const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const config = require("../../config");
const Usuario = require("./model");
const response = require('../../trait/response-trait')
const { validationResult } = require("express-validator");

exports.login = async (req, res) => {
	console.log(req.body)

	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const user = await Usuario.findOne({ email: req.body.email });

	if (!user) {
		response.error(res, message = 'Usuario não encontrado', data = { email: req.body.email });
	} else {
		bcrypt.compare(req.body.password, user.password, async (error, response) => {
			if (response) {
				user.pushToken = req.body.pushToken;

				await user.save();

				var beAToken = { email: data.email, nome: data.nome, id: data.id };

				var token = jwt.sign(beAToken, config.secret, { expiresIn: "365d" });

				response.success(res, message = 'Login efetuado com sucesso!', data = token);
			} else {
				response.error(res, message = 'Usuario não encontrado');
			}
		});
	}
};

exports.registrar = async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const user = await Usuario.findOne({ email: req.body.email });

	if (user) response.error(res);

	var usuario = new Usuario(req.body);

	const data = await usuario.save();

	var beAToken = { email: data.email, nome: data.nome, id: data.id };

	var token = jwt.sign(beAToken, config.secret, { expiresIn: "365d" });

	if (data) response.success(res, message = 'Registro efetuado com sucesso!', data = { user: req.body, token: token });
	else response.error(res, message = 'Registro não foi efetuado');
};