/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/user.controllers.js
 * Description: Responsável pelo CRUD da classe: 'Users'
 * Data: 13/05/2021
 */

const User = require('../models/user.model');

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

    // ==> Generating token
    const token = await newUser.generateAuthToken();
    res
      .status(201)
      .json({ message: 'User register successfully! ', user, token });
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
