/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/messages.controller.js
 * Description: Responsável pelos controles das mensagens na API
 * Data: 27/04/2021
 */

const Messages = require("../models/messages.model");

module.exports = {
  async index(req, res, next) {
    try {
      let Message = await Messages.find();
      res.status(200).send({
        Messages: Message,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },

  async details(req, res, next) {
    try {
      let { chatId } = req.params;
      chatId = chatId.replace("@c.us", "");
      chatId = chatId + "@c.us";

      if (!chatId) {
        const error = new Error("_ID not specified");
        error.status = 400;
        next(error);
      }

      let Message = await Messages.find({ chatId });

      res.status(200).send({
        Message: Message,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },

  async createText(type, author, body, chatId, isServer) {
    if (!isServer) {
      isServer = false;
    }
    let data = { type, author, body, chatId, isServer };
    Message = await Messages.create(data);
    console.log("criado");
    return;
  },

  async createMedia(
    type,
    fileName,
    fileLink,
    author,
    chatId,
    fileLinkDownload,
    isServer
  ) {
    let body = type;
    let data = {
      type,
      author,
      fileName,
      fileLink,
      chatId,
      fileLinkDownload,
      body,
      isServer,
    };
    Message = await Messages.create(data);
    console.log("criado");
    return;
  },
};
