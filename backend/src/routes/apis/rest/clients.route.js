/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/clients.route.js
 * Description: Api com as rotas Rest
 * Data: 27/04/2021
 */

const express = require("express");
const Router = express.Router();
const Clients = require("../../../controllers/clients.controller");

Router.get("/", Clients.index);
Router.get("/attendance", Clients.getAttendace);
Router.get("/details/:_id", Clients.details);

Router.post("/", Clients.create);

Router.put("/:_id", Clients.switchAt);
Router.patch("/first", Clients.SwitchFist);

Router.delete("/:_id", Clients.delete);

module.exports = Router;
