/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/user.controllers.js
 * Description: Responsável pelo CRUD da classe: 'Users'
 * Data: 13/05/2021
 */

const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = 'mysecret';

exports.index = async (req, res) => {
  res.status(200).json({ message: 'Hello World from User Controller' });
};

exports.registerNewUser = async (req, res) => {
  try {
    const isUser = await User.find({ email_user: req.body.email_user });
    if (isUser.length >= 1) {
      return res.status(409).json({ message: 'Atention, existent e-mail!' });
    }

    // ==> Append new user
    const newUser = new User(req.body);
    const user = await newUser.save();

    res
      .status(201)
      //.json({ message: 'User register successfully! ', user, token });
      .json({ message: 'User register successfully! ', user });
  } catch (err) {
    res.status(400).json({ err });
  }
};

// Return all users
exports.returnAllUser = async (req, res) => {
  User.find(function (err, user) {
    if (err) res.status(401).json({ message: 'Error listing users: ' + err });

    res.json(user);
  });
};

// Users return Id:
exports.returnUserId = async (req, res) => {
  User.findById(req.params._id, function (error, user) {
    if (error)
      res.status(401).json({ message: 'Users id invalid! ' + req.params._id });

    res.json(user);
  });
};

// Users delete Id:
exports.deleteUserId = async (req, res) => {
  User.findByIdAndDelete(req.params._id, function (error, user) {
    if (error) {
      res.status(401).json({ message: 'Users id invalid! ' + req.params._id });
    } else {
      return res
        .status(201)
        .json({ message: 'User delete successfully! ', user });
    }
  });
};

// Users update
exports.updateUser = async (req, res) => {
  try {
    User.findById(req.params._id, function (error, user) {
      if (error) {
        return res
          .status(401)
          .json({ message: 'Users id invalid! ' + req.params._id });
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
            .json({ message: 'Data update error user ' + error });
        } else {
          return res
            .status(201)
            .json({ message: 'User update successfully! ', user });
        }
      });
    });
  } catch (error) {
    return res.status(401).json({ message: '<<< Error >>> : ' + error });
  }
};

// Users login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);
  // console.log(email, password);

  User.findOne({ email_user: email, type_user: 1 }, function (err, user) {
    if (err) {
      console.log(err);
      res
        .status(200)
        .json({ error: 'Erro no servidor. Por favor, tente novamente!' });
    } else if (!user) {
      res.status(200).json({ status: 2, error: 'Email ou senha incorreto!' });
    } else {
      user.isCorrectPassword(password, async function (err, same) {
        if (err) {
          res.status(200).json({ error: err });
        } else if (!same) {
          res
            .status(200)
            .json({ status: 2, error: 'Email ou senha incorreto!' });
        } else {
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '24h',
          });
          res.cookie('token', token, { httpOnly: true });
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
};

// Users checktoken
exports.checkToken = async (req, res) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.cookies.token ||
    req.headers['x-access-token'];

  if (!token) {
    res.json({ status: 401, msg: 'Não autorizado: Token inexistente!' });
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.json({ status: 401, msg: 'Não autorizado: Token inválido!' });
      } else {
        res.json({ status: 200 });
      }
    });
  }
};

// Token destroy
exports.destroyToken = async (req, res) => {
  const token = req.headers.token;
  if (token) {
    res.cookie('token', null, { httpOnly: true });
  } else {
    res.status(401).send('Logout não autorizado!');
  }
  res.send('Sessão finalizada com sucesso!');
};

// ==> Retorna os dados do usuário logado através do token armazenado na base de dados
exports.returnUserProfile = async (req, res) => {
  await res.json(req.userData);
};
