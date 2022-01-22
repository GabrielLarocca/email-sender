const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const config = require("../../config");
const Usuario = require("./model");
const response = require('../../trait/response-trait')
const { validationResult } = require("express-validator");

exports.login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const user = await Usuario.findOne({ email: req.body.email });

	if (!user) {
		return response.error(res, message = 'Usuario não encontrado');
	} else {
		bcrypt.compare(req.body.password, user.password, async (error, response_bcrypt) => {
			if (response_bcrypt) {
				user.pushToken = req.body.pushToken;

				await user.save();

				var beAToken = { email: user.email, nome: user.nome, id: user.id };

				var token = jwt.sign(beAToken, config.secret, { expiresIn: "365d" });

				return response.success(res, message = 'Login efetuado com sucesso!', data = `Seu token: ${token}`);
			} else {
				return response.error(res, message = 'Usuario não encontrado');
			}
		});
	}
};

exports.registrar = async (req, res) => {
	const { body: { email, nome } } = req;

	const errors = validationResult(req);

	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const user = await Usuario.findOne({ email: email });

	if (user) {
		return response.error(res, message = 'Registro não foi efetuado');
	} else {
		var usuario = new Usuario(req.body);

		const data_usu = await usuario.save();

		var beAToken = { email: data_usu.email, nome: data_usu.nome, id: data_usu.id };

		var token = jwt.sign(beAToken, config.secret, { expiresIn: "365d" });

		if (data_usu) return response.success(res, message = 'Registro efetuado com sucesso!', data = `Your token: ${token}`);
		else return response.error(res, message = 'Registro não foi efetuado');
	}
};