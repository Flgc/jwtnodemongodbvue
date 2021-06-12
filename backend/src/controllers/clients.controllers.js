/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/routes/clients.controller.js
 * Description: Responsável pelos controles dos clients na API
 * Data: 27/04/2021
 */

const Clients = require("../models/client.model");
const messageHelper = require("../models/messages.model");
const path = require("path");
const fs = require("fs");

module.exports = {
  async SwitchFist(req, res) {
    async function switchAttendance(user, worker) {
      let {
        _id,
        fullName,
        profileUrl,
        chatId,
        inAttendace,
        firstAttendace,
      } = user;

      firstAttendace = false;

      data = { fullName, profileUrl, chatId, inAttendace, firstAttendace };

      let Client = await Clients.findByIdAndUpdate({ _id }, data, {
        new: true,
      });

      return inAttendace;
    }

    const { _id } = req.query;
    console.log(_id);
    const worker = req.body.worker;
    const user = await Clients.findOne({ _id }).lean();

    await switchAttendance(user, worker);

    return res.status(200).send({
      message: "ok",
    });
  },

  async switchAt(req, res) {
    async function switchAttendance(user, worker) {
      let {
        _id,
        fullName,
        profileUrl,
        chatId,
        inAttendace,
        firstAttendace,
      } = user;
      if (inAttendace == true) {
        firstAttendace = true;
        inAttendace = false;
      } else {
        inAttendace = true;
        attendaceBy = worker;
      }
      data = { fullName, profileUrl, chatId, inAttendace, firstAttendace };
      let Client = await Clients.findByIdAndUpdate({ _id }, data, {
        new: true,
      });

      return inAttendace;
    }

    const { _id } = req.params;
    const worker = req.body.worker;
    const user = await Clients.findOne({ _id }).lean();

    await switchAttendance(user, worker);

    return res.status(200).send({
      message: "ok",
    });
  },

  async index(req, res, next) {
    res.status(200).json({ message: "Hello World from Client Controllers" });
  },

  // Return new clients
  async create(req, res, next) {
    try {
      let { fullName, profileUrl, chatId } = req.body;

      if (chatId.length == 13) {
        let part1 = chatId.substr(0, 4);
        let part2 = chatId.substr(5, 12);
        chatId = `${part1}${part2}`;
      }

      chatId = chatId + "@c.us";

      let data = [];

      let client = await Clients.findOne({ chatId });

      try {
        //let s = client.fullName;
        return res
          .status(400)
          .send({ message: "Client already been registered." });
      } catch {
        data = { fullName, profileUrl, chatId };
        fs.mkdir(
          path.resolve("./", "Uploads") + "/" + chatId,
          { recursive: true },
          () => {}
        );
        user = await Clients.create(data);

        // return res.status(200).send({
        // Client: user,
        // message: "success",
        // });

        res
          .status(200)
          .json({ message: "Client register successfully! ", user });
      }
    } catch (error) {
      next(error);
    }
  },

  async createInternal(fullName, profileUrl, chatId) {
    try {
      let data = { fullName, profileUrl, chatId };
      user = await Clients.create(data);
      return;
    } catch (error) {
      next(error);
    }
  },

  // Return all clients
  async returnAllclients(req, res, next) {
    try {
      Clients.find(function (err, clie) {
        if (err)
          res.status(401).json({ message: "Error listing clients: " + err });

        res.json(clie);
      });
    } catch (error) {
      next(error);
    }
  },

  // Client return Id:
  async details(req, res, next) {
    try {
      Clients.findById(req.params._id, function (error, clie) {
        if (error)
          res
            .status(401)
            .json({ message: "Clients id invalid! " + req.params._id });

        res.json(clie);
      });
    } catch (error) {
      next(error);
    }
  },

  // Clients delete Id:
  async delete(req, res, next) {
    try {
      Clients.findByIdAndDelete(req.params._id, function (error, clie) {
        if (error) {
          res
            .status(401)
            .json({ message: "Client id invalid! " + req.params._id });
        } else {
          return res
            .status(201)
            .json({ message: "Client delete successfully! ", clie });
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Clients update
  async update(req, res, next) {
    try {
      Clients.findById(req.params._id, function (error, clie) {
        if (error) {
          return res
            .status(401)
            .json({ message: "Client id invalid! " + req.params._id });
        }

        clie.fullName = req.body.fullName;
        clie.profileUrl = req.body.profileUrl;
        clie.chatId = req.body.chatId;
        clie.inAttendace = req.body.inAttendace;
        clie.firstAttendace = req.body.firstAttendace;

        clie.save(function (error) {
          if (error) {
            return res
              .status(401)
              .json({ message: "Data update error client " + error });
          } else {
            return res
              .status(201)
              .json({ message: "Client update successfully! ", clie });
          }
        });
      });
    } catch (error) {
      next(error);
    }
  },

  async getAttendace(req, res, next) {
    try {
      let inAttendace = true;

      let Client = await Clients.find({ inAttendace }).sort({ updatedAt: 1 });

      let ClientsObject = [];
      for (let key in Client) {
        let chatId = Client[key].chatId;

        let lastMessage = await messageHelper
          .findOne({ chatId })
          .sort({ createdAt: -1 });

        let obj = Client[key].toObject();

        obj.lastMessage = lastMessage;

        ClientsObject.push(obj);
      }

      res.status(200).send({
        Client: ClientsObject,

        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },

  async findInternal(chatId) {
    let User = await Clients.findOne({ chatId });
    try {
      let s = User.fullName;
      let user = User;
      let retur = {
        User: user,
        Exists: true,
      };
      return retur;
    } catch {
      let retur = {
        User: "",
        Exists: false,
      };
      return retur;
    }
  },

  async switchAt(req, res) {
    async function switchAttendance(user) {
      let {
        _id,
        fullName,
        profileUrl,
        chatId,
        inAttendace,
        firstAttendace,
      } = user;
      inAttendace = inAttendace === true ? false : true;
      data = { fullName, profileUrl, chatId, inAttendace, firstAttendace };
      let Client = await Clients.findOneAndUpdate({ _id }, data, {
        new: false,
      });
      return inAttendace;
    }

    const { _id } = req.params;
    const user = await Clients.findOne({ _id }).lean();
    switchAttendance(user);
    return res.status(200).send({
      message: "ok",
    });
  },

  async switchAttendance(user) {
    try {
      let {
        _id,
        fullName,
        profileUrl,
        chatId,
        inAttendace,
        firstAttendace,
      } = user;
      inAttendace = inAttendace === true ? false : true;
      data = { fullName, profileUrl, chatId, inAttendace, firstAttendace };
      let Client = await Clients.findOneAndUpdate({ _id }, data, {
        new: false,
      });
      return inAttendace;
    } catch (e) {
      console.error(e);
    }
  },

  async switchFirst(user) {
    try {
      let {
        _id,
        fullName,
        profileUrl,
        chatId,
        inAttendace,
        firstAttendace,
      } = user;
      inAttendace = true;
      firstAttendace = true;
      data = { fullName, profileUrl, chatId, inAttendace, firstAttendace };
      let Client = await Clients.findOneAndUpdate({ _id }, data, {
        new: false,
      });
      return firstAttendace;
    } catch (e) {
      console.error(e);
    }
  },
};
