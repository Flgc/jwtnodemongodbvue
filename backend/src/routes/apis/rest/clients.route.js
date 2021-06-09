/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/clients.route.js
 * Description: Api com as rotas Rest referente aos contatos recebidos pelo venom-bot
 * Data: 27/04/2021
 */

const express = require("express");
const Router = express.Router();
const Clients = require("../../../controllers/clients.controllers");

Router.get("/", Clients.index);
Router.post("/include", Clients.create);
Router.get("/allclient", Clients.returnAllclients);
Router.get("/details/:_id", Clients.details);
Router.delete("/delete/:_id", Clients.delete);
Router.put("/update/:_id", Clients.update);

Router.get("/attendance", Clients.getAttendace);
Router.put("/:_id", Clients.switchAt);
Router.patch("/first", Clients.SwitchFist);

module.exports = Router;
