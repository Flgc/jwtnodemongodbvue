/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/login.route.js
 * Description: Api com as rotas para login
 * Data: 28/04/2021
 */

const express = require("express");
const Router = express.Router();
const User = require("../../../controllers/user.controllers");

Router.post("/", User.login);
Router.get("/checktoken", User.checkToken);
Router.get("/destroytoken", User.destroyToken);

//Router.get("/api/users/checktoken", User.checkToken);
// Router.get("/api/users/destroytoken", User.destroyToken);

// Router.get("/checktoken/:token", User.checkToken);
// Router.get("/destroytoken/:token", User.destroyToken);

//const Workers = require("../../../controllers/worker.controller");
//Router.post("/", Workers.login);
//Router.get("/checktoken/:token", Workers.checkToken);
//Router.get("/destroytoken/:token", Workers.destroyToken);

module.exports = Router;
