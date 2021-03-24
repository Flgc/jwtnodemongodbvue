/**
 * file: src/config/db.config.js
 * Description: Responsável pela conexão com a base de dados: MongoDb
 * Data: 24/03/2021
 */

const dotenv = require('dotenv');

dotenv.config();

// ==> Aqui posso ajutar outro tipo de base de dados facilmente
modeule.exports = {
  local: {
    localDatabaseUrl: process.env.DB_URI,
    secret: "password"
  }
};