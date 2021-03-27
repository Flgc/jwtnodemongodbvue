/**
 * file: src/config/mongooseConnection.config.js
 * Description: Responsável pela conexão através do mongoose
 * Data: 27/03/2021
 */

const express = require("express");
const mongoose = require("mongoose");

// ==> Importando o arquivo: 'db.config.js'
const database = require("./db.config"); //Conexão loca da base de dados

mongoose.Promise = global.Promise;

// ==> Conectando a base de dados
mongoose
  .connect(database.local.localDatabaseUrl, {
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
