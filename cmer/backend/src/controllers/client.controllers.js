/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/Client.controllers.js
 * Description: Responsável pelo CRUD da classe: 'Client'
 * Data: 15/05/2021
 */

const Client = require('../models/client.model');

exports.index = async (req, res) => {
  res.status(201).json({ message: 'Hello World from Client Controller' });
};
