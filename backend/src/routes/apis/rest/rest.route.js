/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/rest.route.js
 * Description: Api com as rotas Rest
 * Data: 27/04/2021
 */

const express = require("express");
const Router = express.Router();

Router.use("/users", require("./users.route"));
Router.use("/clients", require("./clients.route"));
Router.use("/messages", require("./messages.route"));

module.exports = Router;
