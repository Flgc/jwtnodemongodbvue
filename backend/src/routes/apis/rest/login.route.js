const express = require("express");
const Router = express.Router();
const Workers = require("../../../controllers/worker.controller");

Router.post("/", Workers.login);
Router.get("/checktoken/:token", Workers.checkToken);
Router.get("/destroytoken/:token", Workers.destroyToken);

module.exports = Router;
