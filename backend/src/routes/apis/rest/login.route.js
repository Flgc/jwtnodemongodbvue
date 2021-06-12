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

//Router.get("/api/users/checktoken", User.checkToken);
// Router.get("/api/users/destroytoken", User.destroyToken);

module.exports = Router;
