/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/api.js
 * Description: Api com as rotas para login - venom
 * Data: 27/04/2021
 */

const express = require("express");
const api = express.Router();

api.use("/login", require("./rest/login.route"));
api.use("/", require("./rest/rest.route"));
api.use("/whatsapp", require("./venom/venom.route"));

module.exports = api;
