/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/rest.route.js
 * Description: Api com as rotas Rest
 * Data: 27/04/2021
 */

const express = require("express");
const Router = express.Router();

Router.use("/messages", require("./messages.route"));

Router.use("/users", require("./users.route")); // ok
Router.use("/workers", require("./workers.route")); //ok
Router.use("/clients", require("./clients.route")); //ok

module.exports = Router;
