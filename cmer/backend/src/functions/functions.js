/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/class/venom.js
 * Description: Responsável pelas rotas das funções
 * Data: 01/06/2021
 */

(function () {
  'use strict';
  var functionsInterface = (module.exports = {
    Fallback: require('./exports/fallbackResponses'),
    Sleep: require('./exports/sleep'),
    WriteFileEXT: require('./exports/writeFileName').writeFileName,
    Greetings: require('./exports/greetings'),
    WriteFileMime: require('./exports/writeFileName').writeFileNameWithMime,
    Cors: require('./exports/cors'),
    Limiter: require('./exports/limiter'),
    InitialMessage: require('./exports/initialMessage'),
    Execute: require('./exports/execute'),
    UpgradeVENOM: require('./exports/updateVenom'),
  });
})();
