const config = require('../../config');
const nodemailer = require("nodemailer");
const response = require('../../trait/response-trait');

exports.sendEmail = async (req, res) => {
	const { body } = req;

	var transporter = nodemailer.createTransport({
		host: config.EMAIL_HOST,
		port: config.EMAIL_PORT,
		auth: config.EMAIL_AUTH,
	});

	let info = await transporter.sendMail({
		from: body.email,
		to: 'gabriellarocca1@outlook.com', // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>", // html body
	});

	if (info) {
		response.success(res, message = 'Email ok!', data = info);
	} else {
		response.error(res, message = 'Email error!', data = info);
	}
};