/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/user.routers.js
 * Description: Responsável pelas rotas do Backend
 * Data: 13/05/2021
 */

const express = require('express');
const routes = express.Router();
const Users = require('./controllers/user.controllers');

// Users Routes
routes.get('/api/users', Users.index);
routes.post('/api/users', Users.registerNewUser);
routes.get('/api/users.all', Users.returnAllUser);
routes.get('/api/users.details/:_id', Users.returnUserId);

module.exports = routes;
