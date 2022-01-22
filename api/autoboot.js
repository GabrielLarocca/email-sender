const fs = require("fs");
const exec = require("child_process").execSync;

const configExiste = fs.existsSync("./config.js");
if (!configExiste) fs.copyFileSync("./config.js.example", "./config.js");

const nodemodulesok = fs.existsSync("./node_modules");

if (!nodemodulesok) exec("npm install");