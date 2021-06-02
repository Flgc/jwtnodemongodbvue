/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/config/db.config.js
 * Description: Responsável pela conexão com a base de dados: MongoDb
 * Data: 01/06/2021
 */

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  local: {
    localDatabaseUrl: process.env.DB_URI,
    secret: 'password',
  },
};
