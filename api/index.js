require("./autoboot");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const server = require("http").Server(app);
const cors = require("cors");

const jwt = require("./core/jwt");

require("./connection");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.get("/", (req, res, next) => res.json("online"));

app.use((req, res, next) => {
	next();
});

app.use("/api/auth", require("./app/usuario"))

app.use("/api", jwt);

jwt.use("/email", require("./app/email"));

server.listen('8000', "0.0.0.0");
console.log("Server start on port 8000");
