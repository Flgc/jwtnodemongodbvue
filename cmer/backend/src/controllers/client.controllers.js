/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/user.controllers.js
 * Description: Responsável pelo CRUD da classe: 'User'
 * Data: 13/05/2021
 */

const Users = require('../models/user.model');

module.exports = {
  index(req, res) {
    res.json({ message: 'Hello World from User Controller' });
  },
  async create(req, res) {
    const {
      name,
      email,
      password,
      phone,
      type,
      photo_profile,
      renav,
      plcar,
    } = req.body;

    let data = {};
    let user = Users.findOne({ email: email_user });

    if (!user) {
      data = {
        name,
        email,
        password,
        phone,
        type,
        photo_profile,
        renav,
        plcar,
      };
      user = await Users.create(data);
      return res.status(200).json(user);
    } else {
      return res.status(500).json(user);
    }
  },
};
