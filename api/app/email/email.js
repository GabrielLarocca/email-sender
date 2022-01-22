const config = require('../../config');
const nodemailer = require("nodemailer");
const response = require('../../trait/response-trait');

exports.sendEmail = async (req, res) => {
	const { body: { email, subject, text } } = req;

	var transporter = nodemailer.createTransport({
		host: config.EMAIL_HOST,
		port: config.EMAIL_PORT,
		auth: config.EMAIL_AUTH,
	});

	let info = await transporter.sendMail({
		from: email,
		to: config.EMAIL,
		subject: subject,
		text: text,
	});

	if (info) response.success(res, message = 'Email ok!', data = info);
	else response.error(res, message = 'Email error!', data = info);
};