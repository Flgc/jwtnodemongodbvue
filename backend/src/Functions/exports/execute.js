/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/Functions/exports/execute.js
 * Description: retorna a versão
 * Data: 27/04/2021
 */

const exec = require("child_process");

module.exports = function execute(command) {
  let version = exec.execSync(command);
  return version.toString();
};
