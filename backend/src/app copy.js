/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/app.js
 * Description: Responsável pela chamada das rotas na API
 * Data: 23/03/2021
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const baseDir = path.resolve("../../frontend/", "Views", "build");

const mongooseConnection = require("./config/mongooseConnection.config");

const app = express();
const appR = express.Router();

// ==> Rotas da API (appR):

appR.use("/webhook", require("./routes/webhooks/webhooks"));
appR.use("/api", require("./routes/apis/api"));

// ==> Rotas da API (app):

const index = require("./routes/index");
const userRoutes = require("./routes/user.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(morgan("dev"));
app.use(cors());

appII.use("/webhook", require("./webhooks/webhooks"));
appII.use("/api", require("./apis/api"));

//Recebe as configurações de conexao do mongoose
app.set("mongoose connection", mongooseConnection);

app.use(index);
app.use("/api/v1", userRoutes);

module.exports = app;

//------------------------------- appR -----------------------------------//

appR.get("/files/:id", (req, res, next) => {
  // localhost:3333/files/8796755665?file=a.html
  try {
    let { id } = req.params;
    let fileQuery = req.query.file;
    let download = req.query.download;
    id = id;

    const file = path.resolve("./", "Uploads", id, fileQuery);

    switch (download) {
      case "true":
        res.download(file);
        break;

      default:
        res.sendFile(file);
        break;
    }
  } catch (error) {
    next(error);
  }
});

appR.use(express.static(`${baseDir}`));
appR.get("/*", (req, res) => res.sendFile("index.html", { root: baseDir }));

appR.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

appR.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    error: {
      message: error.message,
    },
  });
});

module.exports = appR;
