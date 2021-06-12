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

  // Return all Messages
  async returnAllmessages(req, res, next) {
    try {
      Messages.find(function (err, mess) {
        if (err)
          res.status(401).json({ message: "Error listing messages: " + err });

        res.json(mess);
      });
    } catch (error) {
      next(error);
    }
  },

  // Messages return chatId: (VENON)
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

  // Messages return chatId (FRONT END)
  async returnDetails(req, res, next) {
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

      res.json(Message);
    } catch (error) {
      next(error);
    }
  },

  // Messages delete chatId:
  async delete(req, res, next) {
    try {
      Messages.findByIdAndDelete(req.params._id, function (error, mens) {
        if (error) {
          res
            .status(401)
            .json({ message: "Message id invalid! " + req.params._id });
        } else {
          return res
            .status(201)
            .json({ message: "Message delete successfully! ", mens });
        }
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
