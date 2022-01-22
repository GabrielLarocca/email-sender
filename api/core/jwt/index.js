var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var response = require('../../trait/response-trait');

var jwtRouter = express.Router();

jwtRouter.use((req, res, next) => {
	var token = req.body.token || req.query.token || req.headers['authorization'];

	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) return response.error(res, data = err, message = 'Failed to authenticate token.', code = 403)
			else {
				req.decoded = decoded;
				next();
			}
		});
	} else return response.error(res, message = 'No token provided.', message = null, code = 403)
});

module.exports = jwtRouter;
