/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/user.controllers.js
 * Description: Responsável pelo CRUD da classe: 'Users'
 * Data: 03/06/2021
 */

const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = {
  async index(req, res, next) {
    res.status(200).json({ message: "Hello World from User Controllers" });
  },

  // Return new users
  async registerNewUser(req, res, next) {
    try {
      const isUser = await Users.find({ email_user: req.body.email_user });
      if (isUser.length >= 1) {
        return res.status(409).json({ message: "Atention, existent e-mail!" });
      }
      // ==> Append new user
      const newUser = new Users(req.body);
      const user = await newUser.save();

      res.status(201).json({ message: "User register successfully! ", user });
    } catch (error) {
      next(error);
    }
  },

  // Return all users
  async returnAllUser(req, res, next) {
    try {
      Users.find(function (err, user) {
        if (err)
          res.status(401).json({ message: "Error listing users: " + err });

        res.json(user);
      });
    } catch (error) {
      next(error);
    }
  },

  // Users return Id:
  async returnUserId(req, res, next) {
    try {
      Users.findById(req.params._id, function (error, user) {
        if (error)
          res
            .status(401)
            .json({ message: "Users id invalid! " + req.params._id });

        res.json(user);
      });
    } catch (error) {
      next(error);
    }
  },

  // Users delete Id:
  async deleteUserId(req, res, next) {
    try {
      Users.findByIdAndDelete(req.params._id, function (error, user) {
        if (error) {
          res
            .status(401)
            .json({ message: "Users id invalid! " + req.params._id });
        } else {
          return res
            .status(201)
            .json({ message: "User delete successfully! ", user });
        }
      });
    } catch (error) {
      next(error);
    }
  },

  // Users update

  async updateUser(req, res, next) {
    try {
      Users.findById(req.params._id, function (error, user) {
        if (error) {
          return res
            .status(401)
            .json({ message: "Users id invalid! " + req.params._id });
        }

        user.name_user = req.body.name_user;
        user.email_user = req.body.email_user;
        user.type_user = req.body.type_user;
        user.password_user = req.body.password_user;
        user.photo_profile_user = req.body.photo_profile_user;

        user.save(function (error) {
          if (error) {
            return res
              .status(401)
              .json({ message: "Data update error user " + error });
          } else {
            return res
              .status(201)
              .json({ message: "User update successfully! ", user });
          }
        });
      });
    } catch (error) {
      next(error);
    }
  },

  // Users login
  async login(req, res) {
    const { email, password } = req.body;

    Users.findOne({ email_user: email }, function (err, user) {
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

  // Users checktoken
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
