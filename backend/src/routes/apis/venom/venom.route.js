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
//const jwtPasser = require("../../../middlewares/verify");
const trustID_SESSION = require("../../../middlewares/idPasserNOCREATE");
const trustID = require("../../../middlewares/idPasser");

Router.get("/qrcode", trustID, Venom.qrCode); /* qrcode?id=1 */
Router.get(
  "/sessions",
  Venom.getMax
); /* http://localhost:3333/api/whatsapp/sessions */
Router.get(
  "/sessions.details/:id",
  Venom.verifySession
); /* http://localhost:3333/api/whatsapp/sessions.details/2 */
Router.post("/sessions", trustID_SESSION, Venom.initializeSession); // ok
Router.post("/sessionfront", trustID_SESSION, Venom.initializeSessionFront); //* http://localhost:3333/api/whatsapp/sessions?id=2 */
Router.delete(
  "/sessions",
  trustID,
  Venom.closeSession
); /* http://localhost:3333/api/whatsapp/sessions?id=1 */
Router.get("/chats", trustID, Venom.receberChatsNovos);
Router.get(
  "/chats/:number",
  trustID,
  Venom.todosAsMensagensDoNumero
); /* http://localhost:3333/api/whatsapp//chats/21998535530?id=2&includeMe=true */
Router.get(
  "/valid/:number",
  trustID,
  Venom.verificarNumero
); /* http://localhost:3333/api/whatsapp/valid/5521998535530?id=2 */
Router.get(
  "/device",
  trustID,
  Venom.inputDeviceInfo
); /* http://localhost:3333/api/whatsapp/device?id=2  */
Router.get(
  "/device.battery",
  Venom.nivelBateria
); /* http://localhost:3333/api/whatsapp/device.battery?id=2 */
Router.post("/message", trustID, Venom.enviarMensagens); //ok
/* 
      Post ==> http://localhost:3333/api/whatsapp/message?id=2
      body = {
       "worker": "5521998535530",
       "numbers": "5521999520191, 5521983498213",
       "messages": "Oi para o primeiro número/:end:/Oi para o segundo número"
     } 
*/
Router.post("/message.doc", trustID, Venom.enviarArquivoBase64); // /mensagem.doc?id=1 \body {"numbers": "558796574896, 558796574896", "base64": "foo bar", "name":"name.ext", "message": "caption"}

module.exports = Router;
