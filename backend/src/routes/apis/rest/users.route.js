/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/rest/users.route.js
 * Description: Api com as rotas de Usuários do sistema
 * Data: 07/06/2021
 */

const express = require("express");
const Routes = express.Router();
const Users = require("../../../controllers/user.controllers");

Routes.get("/", Users.index);
Routes.post("/include", Users.registerNewUser);
Routes.get("/alluser", Users.returnAllUser);
Routes.get("/details/:_id", Users.returnUserId);
Routes.delete("/delete/:_id", Users.deleteUserId);
Routes.put("/update/:_id", Users.updateUser);

Routes.get("/checktoken", Users.checkToken);
Routes.get("/destroytoken", Users.destroyToken);

module.exports = Routes;
