/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: server.js
 * Description: Responsável por configurar toda a execução da Aplicação
 * Data: 13/05/2021
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  'mongodb://localhost:27017/mecanicabot',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('MongoDB CONNECTED Sucessifully');
    }
  }
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(routes);

app.listen(port, function () {
  console.log(`Server runing on PORT: ${port}`);
});
