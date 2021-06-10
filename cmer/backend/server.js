/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: server.js
 * Description: Responsável por configurar toda a execução da Aplicação
 * Data: 13/05/2021
 */

const path = require('path');
const pathEnv = path.resolve(__dirname, '.env');

const express = require('express');
const restApi = express();

const cookieParser = require('cookie-parser');
const cors = require('cors');

const morgan = require('morgan');
const fs = require('fs');
const routes = require('./src/routes');
const functions = require('./src/functions/functions');
const mongoConector = require('./src/config/mongooseConnection.config');
const WhatsApp = require('./src/controllers/multisession.controllers');

const app = express();

('use strict');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(routes);

let serverRest;

(async function () {
  await mongoConector();
  //await WhatsApp.createInternal();
  //await WhatsApp.initilizeInternal();
})();

let io;
(function () {
  console.clear();
  switch (process.env.useHTTPS) {
    case '1':
      let certificate;
      let privatekey;

      try {
        certificate = fs.readFileSync(process.env.CERT_CRT);
        privatekey = fs.readFileSync(process.env.CERT_KEY);
      } catch (e) {
        console.error(e);
        serverRest = require('http').createServer(restApi);
        io = require('socket.io')(serverRest);
        serverRest.listen(process.env.PORT, process.env.HOST, () => {});

        console.info(
          `Servidor HTTP rodando em: http://${process.env.HOST}:${process.env.PORT}/`
        );
        break;
      }
      io = require('socket.io')(serverRest);
      serverRest = require('https').createServer(
        { key: privatekey, cert: certificate, rejectUnauthorized: false },
        restApi
      );

      serverRest.listen(process.env.PORT, process.env.HOST, () => {});

      console.info(
        `Servidor HTTPS rodando em: https://${process.env.HOST}:${process.env.PORT}/`
      );
      break;

    default:
      serverRest = require('http').createServer(restApi);
      io = require('socket.io')(serverRest);
      serverRest.listen(process.env.PORT, process.env.HOST, () => {});
      console.info(
        `Servidor HTTP rodando em: http://${process.env.HOST}:${process.env.PORT}/`
      );
  }

  restApi.use(
    cors({
      origin: '*',
      allowedHeaders:
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      methods: 'PUT, POST, PATCH, DELETE, GET',
    })
  );

  restApi.use(functions.Limiter);

  restApi.use(morgan('tiny'));

  restApi.use(express.urlencoded({ limit: '20mb', extended: true }));
  restApi.use(express.json({ limit: '20mb' }));
  restApi.use(cookieParser());

  restApi.use(app);
})();

io.on('connection', (socket) => {
  console.log(`Socket conectado ${socket.id}`);
});

exports.emit = function (event, data) {
  return io.emit(event, data);
};
