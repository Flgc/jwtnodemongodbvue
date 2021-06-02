/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/functions/exports/limiter.js
 * Description: Limitação de solicitações
 * Data: 02/06/2021
 */

const RateLimit = require('express-rate-limit');

let limiter = new RateLimit({
  windowMs: 5 * 1000, // 8 seconds
  max: 50,
});

module.exports = limiter;
