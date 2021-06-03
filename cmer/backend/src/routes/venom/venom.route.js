/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/venom/venom.route.js
 * Description: Api com as rotas para consumo do venom-bot
 * Data: 02/06/2021
 */

const express = require('express');
const Venom = require('../../controllers/multisession.controllers');
const Router = express.Router();
const jwtPasser = require('../../middlewares/verify');
const trustID_SESSION = require('../../middlewares/idPasserNOCREATE');
const trustID = require('../../middlewares/idPasser');

Router.get('/qrcode', trustID, Venom.qrCode);
Router.get('/sessions', jwtPasser, Venom.getMax);
Router.get('/sessions.details/:id', jwtPasser, Venom.verifySession);
Router.post('/sessions', jwtPasser, trustID_SESSION, Venom.initializeSession);
Router.delete('/sessions', jwtPasser, trustID, Venom.closeSession);
Router.get('/chats', jwtPasser, trustID, Venom.receberChatsNovos);
Router.get(
  '/chats/:number',
  jwtPasser,
  trustID,
  Venom.todosAsMensagensDoNumero
);
Router.get('/valid/:number', jwtPasser, trustID, Venom.verificarNumero);
Router.get('/device', jwtPasser, trustID, Venom.inputDeviceInfo);
Router.get('/device.battery', jwtPasser, Venom.nivelBateria);
Router.post('/message', jwtPasser, trustID, Venom.enviarMensagens);
Router.post('/message.doc', jwtPasser, trustID, Venom.enviarArquivoBase64);
// /mensagem.doc?id=1 \body {"numbers": "558796574896, 558796574896", "base64": "foo bar", "name":"name.ext", "message": "caption"}

module.exports = Router;
