/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/webhooks/webhooks.js
 * Description: Webhooks
 * Data: 27/04/2021
 */

const express = require("express");
const Router = express.Router();

Router.post("/dialogflow", require("./dialogflow"));

module.exports = Router;
