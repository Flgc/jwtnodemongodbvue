/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/index.js
 * Description: Responsável pela rota default da API
 * Data: 23/03/2021
 */

const express = require("express");

const router = express.Router();

// ==> v1 = 1ª versao da API:
router.get("/api/v1", (req, res) => {
  res.status(200).send({
    success: true,
    message:
      "Projeto Aplicado - Controle de Manutenção API com Node.js & MongoDb",
    version: "1.0.0",
  });
});

module.exports = router;
