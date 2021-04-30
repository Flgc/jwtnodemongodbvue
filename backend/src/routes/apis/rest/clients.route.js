/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/clients.route.js
 * Description: Api com as rotas Rest referente aos contatos recebidos pelo venom-bot
 * Data: 27/04/2021
 */

const express = require("express");
const Router = express.Router();
const Clients = require("../../../controllers/clients.controller");

Router.get("/", Clients.index); // ok
Router.get("/attendance", Clients.getAttendace); //ok
Router.get("/details/:_id", Clients.details); //ok

Router.post("/", Clients.create); //ok

Router.put("/:_id", Clients.switchAt); //ok
Router.patch("/first", Clients.SwitchFist);

Router.delete("/:_id", Clients.delete); //ok

module.exports = Router;
