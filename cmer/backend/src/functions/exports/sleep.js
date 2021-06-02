/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/functions/exports/sleep.js
 * Description: Sleep
 * Data: 02/06/2021
 */

module.exports = function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
