/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/class/notifier.js
 * Description: Retorna a versão do venon-bot
 * Data: 01/06/2021
 */

const notifier = require('node-notifier');
const path = require('path');

class Notifier {
  constructor() {
    this.notifier = notifier;
  }

  notify(message) {
    this.notifier.notify({
      title: 'MecanicaBot',
      message: message,
      icon: path.resolve(
        './',
        'controllers',
        'class',
        'temp',
        'mecanicaBot.png'
      ),
      timeout: 5,
      appID: 'Nm Soft',
    });
  }
}

module.exports = Notifier;
