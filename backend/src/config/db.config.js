/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/config/db.config.js
 * Description: Responsável pela conexão com a base de dados: MongoDb
 * Data: 24/03/2021
 */

const dotenv = require("dotenv");

dotenv.config();

// ==> Aqui posso implementar outro tipo de base de dados facilmente
module.exports = {
  local: {
    localDatabaseUrl: process.env.DB_URI,
    secret: "password",
  },
};
