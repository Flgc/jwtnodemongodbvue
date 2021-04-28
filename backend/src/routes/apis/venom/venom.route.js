/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/apis/venom/venom.route.js
 * Description: Api com as rotas para consumo do venom
 * Data: 27/04/2021
 */

const express = require("express");
const Venom = require("../../../controllers/multisession.controller");
const Router = express.Router();
const jwtPasser = require("../../../middlewares/verify");
const trustID_SESSION = require("../../../middlewares/idPasserNOCREATE");
const trustID = require("../../../middlewares/idPasser");

Router.get("/qrcode", trustID, Venom.qrCode); // /qrcode?id=1

Router.get("/sessions", jwtPasser, Venom.getMax); // []
Router.get("/sessions.details/:id", jwtPasser, Venom.verifySession); // sessions.details/1
Router.post("/sessions", jwtPasser, trustID_SESSION, Venom.initializeSession); // /sessions?id=1
Router.delete("/sessions", jwtPasser, trustID, Venom.closeSession); // /sessions?id=1

Router.get("/chats", jwtPasser, trustID, Venom.receberChatsNovos); // /?id=1
Router.get(
  "/chats/:number",
  jwtPasser,
  trustID,
  Venom.todosAsMensagensDoNumero
); // /558796574896id=1&includeMe=true

Router.get("/valid/:number", jwtPasser, trustID, Venom.verificarNumero); // /558796574896?id=1

Router.get("/device", jwtPasser, trustID, Venom.inputDeviceInfo); // /device?id=1
Router.get("/device.battery", jwtPasser, Venom.nivelBateria); //  /device/battery?id=1

Router.post("/message", jwtPasser, trustID, Venom.enviarMensagens); // /mensagem?id=1 \body {"numbers": "558796574896, 558796574896", "messages": "Oi/:end:/Teste"}

Router.post("/message.doc", jwtPasser, trustID, Venom.enviarArquivoBase64); // /mensagem.doc?id=1 \body {"numbers": "558796574896, 558796574896", "base64": "foo bar", "name":"name.ext", "message": "caption"}

module.exports = Router;
