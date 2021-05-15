/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/user.controllers.js
 * Description: Responsável pelo CRUD da classe: 'Users'
 * Data: 13/05/2021
 */

const User = require('../models/user.model');

exports.index = async (req, res) => {
  res.status(201).json({ message: 'Hello World from User Controller' });
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

    // ==> Generating token
    const token = await newUser.generateAuthToken();
    res
      .status(201)
      .json({ message: 'User register successfully!', user, token });
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
    if (error) res.status(401).json({ message: 'Users id invalid! ' + error });

    res.json(user);
  });
};
