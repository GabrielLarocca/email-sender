const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const Schema = mongoose.Schema({
	ativo: { type: Boolean, default: true },
	nome: String,
	email: String,
	password: String,
});

Schema.pre("save", function (next) {
	const user = this;

	if (!user.isModified("password")) return next();

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err);

			user.password = hash;

			next();
		});
	});
});

module.exports = mongoose.model("User", Schema);
