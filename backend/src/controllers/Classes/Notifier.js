/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/Classes/Notifier.js
 * Description: Responsável pelas notificações da versão e outros da Aplicação
 * Data: 27/04/2021
 */

const notifier = require("node-notifier");
const path = require("path");

class Notifier {
  constructor() {
    this.notifier = notifier;
  }

  notify(message) {
    this.notifier.notify({
      title: "MecanicaBot",
      message: message,
      icon: path.resolve(
        "./",
        "controllers",
        "Classes",
        "Temp",
        "mecanicaBot.png"
      ),
      timeout: 5,
      appID: "Nm Soft",
    });
  }
}

module.exports = Notifier;
