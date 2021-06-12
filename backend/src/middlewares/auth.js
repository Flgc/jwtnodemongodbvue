/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/middlewares/auth.js
 * Description: Responsável pela confirmação de determinado(a) 'User' esta autorizado a acessar recursos
 * Data: 27/03/2021
 */

const jwt = require("jsonwebtoken");

// ==> Verifica se o token do usuário no banco pode ser utilizado e autorizado pelo sistema
module.exports = (req, res, next) => {
  try {
    // ==> Recebe a requisição do GET
    const token = req.headers.authorization.replace("Bearer ", "");

    // ==> Decodificando o token
    const decoded = jwt.verify(token, "secret");
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Falha na Autenticação!" });
  }
};
