/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/Functions/exports/greetings.js
 * Description: Saudações
 * Data: 27/04/2021
 */

module.exports = function () {
  let now = new Date();
  let hour = now.getHours();
  let comp;

  if (hour >= 4 && hour <= 12) {
    comp = "Bom dia";
  }
  if (hour > 12 && hour <= 17) {
    comp = "Boa tarde";
  }
  if (hour > 17 || hour < 4) {
    comp = "Boa noite";
  }

  return comp;
};
