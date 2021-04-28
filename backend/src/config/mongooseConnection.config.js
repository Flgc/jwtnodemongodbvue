/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/config/mongooseConnection.config.js
 * Description: Responsável pela conexão através do mongoose
 * Data: 27/03/2021
 */

const mongoose = require("mongoose");

// ==> Importando o arquivo: 'db.config.js'
const database = require("./db.config"); //Conexão loca da base de dados

mongoose.Promise = global.Promise;

/* / ==> Conectando a base de dados
mongoose
  .connect(database.local.localDatabaseUrl, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log("Base de dados conectada com sucesso!");
    },
    (err) => {
      console.log(`Erro ao conectar com a Base de dados..: ${err}`);
      process.exit();
    }
  );
*/
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
        console.log(" - Erro no MongoDB");
        process.exit(1);
      } else {
        console.info("- MongoDB connected.");
      }
    }
  );
};
