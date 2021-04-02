/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/index.js
 * Description: Responsável pela rota default da API
 * Data: 23/03/2021
 */

const express = require("express");
const Sessions = require("../controllers/sessions.controllers");
const router = express.Router();
const path = require("path");

// ==> v1 = 1ª versao da API:
router.get("/api/v1", (req, res) => {
  res.status(200).send({
    success: true,
    message:
      "Projeto Aplicado - Controle de Manutenção API com Node.js & MongoDb",
    version: "1.0.0",
  });
});

router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname + "/home.html"))
);

router.get("/logado", (req, res) =>
  res.sendFile(path.join(__dirname + "/logado.html"))
);

router.get("/home", (req, res) =>
  res.sendFile(path.join(__dirname + "/start.html"))
);

router.get("/start", async (req, res, next) => {
  res.status(200).send({
    success: true,
    message: "Aguarde...",
    version: "1.0.0",
  });
  console.log("Iniciando..." + req.query.sessionName);
  const session = await Sessions.start(req.query.sessionName);

  if (["CONNECTED", "QRCODE", "STARTING"].includes(session.state)) {
    res.status(200).json({ result: "success", message: session.state });

    if (session.status === "notLogged" && session.state != "CONNECTED") {
      console.log("Estado da conexão");
      console.log(session.state);

      res.redirect(
        "/qrcode?sessionName=" + req.query.sessionName + "&image=true"
      ); //Rota do qrcode sem precisar digitar no navegador
    }

    if (session.status === "isLogged" || session.status === "inChat") {
      res.redirect("/logado?numero=5521998535530"); //Com esse redirecionamento será possível passar pela rota de qrcode sem precisar digitar no navegador Recebe Json de conversa do contato especificado no console.
    }
  } else {
    res.status(200).json({ result: "error", message: session.state });
    console.log("Erro ao tentar conectar" + session.state);
  }
});

router.get("/qrcode", async (req, res, next) => {
  console.log("qrcode..." + req.query.sessionName);
  let session = Sessions.getSession(req.query.sessionName);

  console.log("Status >> : " + session.status + " State >>: " + session.state);

  if (session !== false) {
    if (session.status === "notLogged") {
      if (req.query.image) {
        res.sendFile(
          __dirname + "/start.html",
          { key: req.query.sessionName },
          function (err, html) {
            console.log(err);
            console.log(html);
          }
        );
      } else {
        res.status(200).json({
          result: "success",
          message: session.state,
          qrcode: session.qrcode,
        });
      }
    } else if (session.status === "inChat" || session.status === "isLogged") {
      console.log("Logado redirecionando para Home.");
      res.redirect("/");
    }
  } else {
    res.status(200).json({ result: "error", message: "NOTFOUND" });
  }
});

router.get("/new_qrcode", async (req, res, next) => {
  const session = await Sessions.getSession(req.query.sessionName);

  if (session) {
    console.log(
      "Status >> : " + session.status + " State >> : " + session.state
    );
    if (session.status === "inChat" || session.state === "CONNECTED") {
      console.log("Já está Logado...");
      return res.json({
        success: "true",
        object: false,
        message: "Já está logado!!!",
        is_active: true,
      });
    } else if (
      session.status === "notLogged" ||
      session.status === "qrReadSuccess"
    ) {
      console.log("Vou gerar o QRCODE...");
      res.json({
        success: "true",
        object: session.qrcode,
        message: "Novo qrcode gerado com sucesso!!!",
        is_active: false,
      });
    }
  } else {
    res.json({ success: "false", message: "NOTFOUND" });
  }
});

router.post("/sendText", async function sendText(req, res, next) {
  console.log(req.body);
  var result = await Sessions.sendText(
    req.body.sessionName,
    req.body.number,
    req.body.text
  );
  res.json(result);
});

router.get("/mensagem", async function (req, res, next) {
  var result = await Sessions.sendText(
    req.query.sessionName,
    req.query.number,
    req.query.text
  );
  res.json(result);
});

router.get("/link", async function (req, res, next) {
  var result = await Sessions.sendLinkPreview(
    req.query.sessionName,
    req.query.number,
    req.query.link,
    req.query.title
  );
  res.json(result);
});

router.get("/endereco", async function (req, res, next) {
  var result = await Sessions.sendLocation(
    req.query.sessionName,
    req.query.number,
    req.query.long,
    req.query.lat,
    req.query.endereco
  );
  res.json(result);
});

router.get("/contato", async function (req, res, next) {
  var result = await Sessions.sendContactVcard(
    req.query.sessionName,
    req.query.number,
    req.query.contact,
    req.query.cname,
    req.query.i
  );
  res.json(result);
});

router.get("/imagem", async function (req, res, next) {
  var result = await Sessions.sendImage(
    req.query.sessionName,
    req.query.number,
    req.query.path,
    req.query.imgname,
    req.query.caption,
    req.query.i
  );
  res.json(result);
});

router.get("/doc", async function (req, res, next) {
  var result = await Sessions.sendFile(
    req.query.sessionName,
    req.query.number,
    req.query.path,
    req.query.filename,
    req.query.caption
  );
  res.json(result);
});

router.get("/sendFile", async (req, res, next) => {
  var result = await Sessions.sendFile(
    req.body.sessionName,
    req.body.number,
    req.body.base64Data,
    req.body.fileName,
    req.body.caption
  );
  res.json(result);
});

router.get("/close", async (req, res, next) => {
  var result = await Sessions.closeSession(req.query.sessionName);
  res.json(result);
});

process.stdin.resume(); //so the program will not close instantly

async function exitHandler(options, exitCode) {
  if (options.cleanup) {
    console.log("cleanup");
    await Sessions.getSessions().forEach(async (session) => {
      await Sessions.closeSession(session.sessionName);
    });
  }
  if (exitCode || exitCode === 0) {
    console.log(exitCode);
  }

  if (options.exit) {
    process.exit();
  }
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));
//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));
// catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

module.exports = router;
