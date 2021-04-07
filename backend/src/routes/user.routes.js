/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/user.routers.js
 * Description: Responsável pelas rotas do 'User
 * Data: 25/03/2021
 */

const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controllers");

// ==> Rota responsavel por criar um novo 'User': (POST) http://localhost:3333/api/v1/register
router.post("/register", userController.registerNewUser);

// ==> Rota responsavel por realizar um novo login 'User': (POST) http://localhost:3333/api/v1/login
router.post("/login", userController.loginUser);

// ==> Rota responsavel por retornar usuário 'User': (GET) http://localhost:3333/api/v1/userProfile
router.get("/userProfile", auth, userController.returnUserProfile);

// ==> Rota responsavel por retornar todos usuário 'User': (GET) http://localhost:3333/api/v1/allUsers
router.get("/allUsers", auth, userController.returnAllUser);

// ==> Rota responsavel por retornar usuário por Id: 'User': (GET) http://localhost:3333/api/v1/userId/:
router.get("/userId/:user_id", auth, userController.returnUserId);

// ==> Rota responsavel por atualizar usuário por Id 'User': (PUT) http://localhost:3333/api/v1/updtUser/:
router.put("/updtUser/:user_id", auth, userController.updtUser);

module.exports = router;
