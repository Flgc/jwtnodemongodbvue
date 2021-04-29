/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/works.route.js
 * Description: Api com as rotas Works (Usuários do sistema)
 * Data: 27/04/2021
 */

const express = require("express");
const Router = express.Router();
const Workers = require("../../../Controllers/worker.controller");

Router.get("/", Workers.index);
Router.get("/details/:_id", Workers.details);
Router.post("/", Workers.create);
Router.put("/:_id", Workers.update);
Router.delete("/:_id", Workers.delete);

module.exports = Router;
