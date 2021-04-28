/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/Functions/exports/limiter.js
 * Description: Limitação de solicitações
 * Data: 27/04/2021
 */

const RateLimit = require("express-rate-limit");

let limiter = new RateLimit({
  windowMs: 5 * 1000, // 8 seconds
  max: 50,
});

module.exports = limiter;
