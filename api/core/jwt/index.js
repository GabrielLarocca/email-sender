var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../../config');

var jwtRouter = express.Router();

jwtRouter.use(function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['authorization'];

	if (token) {
		jwt.verify(token, config.secret, function (err, decoded) {
			if (err) return res.json({ success: false, message: 'Failed to authenticate token.', login: true });
			else {
				req.decoded = decoded;
				next();
			}
		});
	} else return res.status(403).send({ success: false, message: 'No token provided.' });
});

module.exports = jwtRouter;
