/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/user.controllers.js
 * Description: Responsável pelo CRUD da classe: 'Users'
 * Data: 03/06/2021
 */

const Workers = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = {
  async index(req, res, next) {
    res.status(200).json({ message: "Hello World from User Controllers" });
  },

  async returnAllUser(req, res, next) {
    try {
      let Worker = await Workers.find();
      res.status(200).send({
        Users: Worker,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },

  async returnUserId(req, res, next) {
    try {
      const { _id } = req.params;

      if (!_id) {
        const error = new Error("_ID not specified");
        error.status = 400;
        next(error);
      }

      let Worker = await Workers.find({ _id });

      res.status(200).send({
        User: Worker,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },

  async registerNewUser(req, res, next) {
    try {
      const {
        name_user,
        email_user,
        type_user,
        password_user,
        photo_profile_user,
      } = req.body;
      let data = [];

      let Worker = await Workers.findOne({ email_usuario });

      try {
        let s = Worker.fullName;
        return res
          .status(400)
          .send({ message: "Worker already been registered." });
      } catch {
        data = {
          name_user,
          email_user,
          type_user,
          password_user,
          photo_profile_user,
        };
        Worker = await Workers.create(data);
        return res.status(200).send({
          Worker: Worker,
          message: "success",
        });
      }
    } catch (error) {
      next(error);
    }
  },

  async deleteUserId(req, res, next) {
    try {
      const { _id } = req.params;
      if (!_id) {
        const error = new Error("_ID not specified");
        error.status = 400;
        next(error);
      }

      let Worker = await Workers.findByIdAndDelete({ _id });
      return res.status(200).send({
        User,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },

  async updateUser(req, res, next) {
    try {
      const { _id } = req.params;
      const {
        name_user,
        email_user,
        type_user,
        password_user,
        photo_profile_user,
      } = req.body;

      if (!_id) {
        const error = new Error("_ID not specified");
        error.status = 400;
        next(error);
      }

      let data = {
        name_user,
        email_user,
        type_user,
        password_user,
        photo_profile_user,
      };

      const Worker = await Workers.findOneAndReplace(_id, data);

      res.status(200).send({
        User,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    Workers.findOne({ email_user: email }, function (err, user) {
      if (err) {
        console.log(err);
        res.status(200).json({ error: err });
      } else if (!user) {
        res
          .status(200)
          .json({ status: 2, error: "1Email ou senha incorreto!" });
      } else {
        user.isCorrectPassword(password, async function (err, same) {
          if (err) {
            res.status(200).json({ error: err });
          } else if (!same) {
            res
              .status(200)
              .json({ status: 2, error: "2Email ou senha incorreto!" });
          } else {
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "24h",
            });
            res.cookie("token", token, { httpOnly: true });
            res.status(200).json({
              status: 1,
              auth: true,
              token: token,
              user_id: user._id,
              user_name: user.name_user,
              user_type: user.type_user,
            });
          }
        });
      }
    });
  },

  async checkToken(req, res) {
    const token =
      req.body.token ||
      req.query.token ||
      req.params.token ||
      req.cookies.token ||
      req.headers["x-access-token"] ||
      req.headers.authorization;
    if (!token) {
      res.json({ status: 401, msg: "Não autorizado: Token inexistente!" });
    } else {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          res.json({ status: 401, msg: "Não autorizado: Token inválido!" });
        } else {
          res.status(200).json({ status: 200 });
        }
      });
    }
  },

  // Token destroy
  async destroyToken(req, res) {
    const token =
      req.headers.token ||
      req.body.token ||
      req.query.token ||
      req.cookies.token ||
      req.headers["x-access-token"] ||
      req.headers.authorization;

    if (token) {
      res.cookie("token", null, { httpOnly: true });
    } else {
      res.status(401).send("Logout não autorizado!");
    }
    res.send("Sessão finalizada com sucesso!");
  },

  // Retorna os dados do usuário logado através do token armazenado na base de dados
  async returnUserProfile(req, res) {
    await res.json(req.userData);
  },
};
