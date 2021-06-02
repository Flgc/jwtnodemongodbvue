/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/config/mongooseConnection.config.js
 * Description: Responsável pela conexão através do mongoose
 * Data: 01/06/2021
 */

const mongoose = require('mongoose');
const database = require('./db.config');

mongoose.Promise = global.Promise;
module.exports = async function () {
  await mongoose.connect(
    database.local.localDatabaseUrl,
    {
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log(' - Erro no MongoDB');
        process.exit(1);
      } else {
        console.info('- MongoDB connected.');
      }
    }
  );
};
