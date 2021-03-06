/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/Functions/exports/cors.js
 * Description: Controle de acesso - Cors
 * Data: 27/04/2021
 */

module.exports = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({
      "Access-Control-Allow-Methods": "PUT, POST, PATCH, DELETE, GET",
    });
  }

  next();
};
