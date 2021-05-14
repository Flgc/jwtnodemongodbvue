/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/user.routers.js
 * Description: Responsável pelas rotas do Backend
 * Data: 13/05/2021
 */

const express = require('express');
const routes = express.Router();
const User = require('./controllers/user.controllers');

routes.get('/', User.index);
routes.post('/api/user', User.registerNewUser);

module.exports = routes;
