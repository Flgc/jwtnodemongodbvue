/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/Functions/functions.js
 * Description: Responsável pelas rotas das funções
 * Data: 27/04/2021
 */

(function () {
  "use strict";
  var functionsInterface = (module.exports = {
    Fallback: require("./exports/fallbackResponses"),
    Sleep: require("./exports/sleep"),
    WriteFileEXT: require("./exports/writeFileName").writeFileName,
    Greetings: require("./exports/greetings"),
    WriteFileMime: require("./exports/writeFileName").writeFileNameWithMime,
    Cors: require("./exports/cors"),
    Limiter: require("./exports/limiter"),
    InitialMessage: require("./exports/initialMessage"),
    Execute: require("./exports/execute"),
    UpgradeVENOM: require("./exports/updateVenom"),
  });
})();
