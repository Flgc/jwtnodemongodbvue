/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/Functions/exports/sleep.js
 * Description: Sleep
 * Data: 27/04/2021
 */

module.exports = function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
