/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/middlewares/idPasserNOCREATE.js
 * Description: Retornar o ID de sessão inválido
 * Data: 27/04/2021
 */

let sessions = require("../controllers/multisession.controller");

module.exports = (req, res, next) => {
  let idText = req.query.id;
  let limit = sessions.getLimit();
  let idNumber;

  try {
    idNumber = new Number(idText);
  } catch {
    res.status(400).send({
      error: "Invalid ID",
    });
  }

  if (idNumber >= 0 && idNumber < limit) {
    next();
  } else {
    res.status(400).send({
      error: "Invalid ID",
    });
  }
};
