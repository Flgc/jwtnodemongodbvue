/**
 * file: src/routes/user.routers.js
 * Description: Responsável pelas rotas do 'User
 * Data: 25/03/2021
 */

const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controllers");

// ==> Rota responsavel por criar um novo 'User': (POST) localhost:3000/api/v1/register
router.post("/register", userController.registerNewUser);

// ==> Rota responsavel por realizar um novo login 'User': (POST) localhost:3000/api/v1/login
router.post("/login", userController.loginUser);

// ==> Rota responsavel retornar usuário 'User': (GET) localhost:3000/api/v1/userProfile
router.get("/userProfile", auth, userController.returnUserProfile);

module.exports = router;
