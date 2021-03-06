/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/messages.route.js
 * Description: Api com as rotas de mensagens
 * Data: 27/04/2021
 */

const express = require("express");
const messageController = require("../../../controllers/messages.controller");
const Router = express.Router();

Router.get("/", messageController.index);
Router.get("/allmessage", messageController.returnAllmessages);
Router.get("/chatid/:chatId", messageController.returnDetails);
Router.get("/:chatId", messageController.details);
Router.delete("/delete/:_id", messageController.delete);

module.exports = Router;
