/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/middlewares/verify.js
 * Description: Responsável pelas verificação do acesso
 * Data: 27/04/2021
 */

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = async function checkToken(req, res, next) {
  const token =
    req.body.token ||
    req.query.token ||
    req.cookies.token ||
    req.headers["x-access-token"] ||
    req.headers.authorization;
  if (!token) {
    res.status(401).json({ status: 401, msg: "Access denied" });
  } else {
    jwt.verify(token, secret, (err) => {
      if (err) {
        res.status(401).json({ status: 401, msg: "Access denied" });
      } else {
        next();
      }
    });
  }
};
