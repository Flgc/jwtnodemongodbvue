/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/functions/exports/initialMessage.js
 * Description: Apresenta a mensagem inicial da aplicação
 * Data: 02/06/2021
 */

let versionFlow = require('../../../package.json');
module.exports = function (myself) {
  let text = [];
  text[0] = `Olá *${myself.name}*, seu WhatsApp versão _${myself.waVersion}_ está *atualmente conectado em uma plataforma de automação*, ou seja, seu dispositivo está funcionando como um *chatbot*.`;
  text[1] = `*Caso você não queira seu aparelho conectado no MecanicaBot ${versionFlow.version}_ apenas vá nas configurações do seu WhatsApp e apague todos os dispositivos logados no WhatsApp Web.*`;
  text[2] =
    '_Esta é uma mensagem de aviso que serve para prevenir de possíveis ataques de phishing._';
  return text;
};
