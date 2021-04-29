/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/login.route.js
 * Description: Api com as rotas para login
 * Data: 28/04/2021
 */

const express = require("express");
const Router = express.Router();
const Workers = require("../../../controllers/worker.controller");

Router.post("/", Workers.login);
Router.get("/checktoken/:token", Workers.checkToken);
Router.get("/destroytoken/:token", Workers.destroyToken);

module.exports = Router;
