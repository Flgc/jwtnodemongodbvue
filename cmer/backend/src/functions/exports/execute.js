/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/functions/exports/execute.js
 * Description: retorna a versao
 * Data: 02/06/2021
 */

const exec = require('child_process');

module.exports = function execute(command) {
  let version = exec.execSync(command);
  return version.toString();
};
