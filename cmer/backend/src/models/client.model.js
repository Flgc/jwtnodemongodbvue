/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/models/user.model.js
 * Description: Responsável pelo modelo da da base 'User'
 * Data: 13/05/2021
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const DataSchema = new mongoose.Schema(
  {
    name_user: { type: String, maxlength: 50, required: true },
    email_user: { type: String, maxlength: 30, required: true },
    password_user: { type: String, required: true },
    phone_user: { type: String, maxlength: 30, required: false },
    type_user: { type: Number, default: 1 }, // 1-User, 2-GrandUSER, 3-HIPER-FOCKING-BIG-MORE-THAN-YOUR-MOM-USER
    photo_profile_user: {
      type: String,
      default:
        'https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg',
    },
    renav_user: { type: String, maxlength: 30, required: false },
    plcar_user: { type: String, maxlength: 15, required: false },
    tokens_user: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

DataSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const users = mongoose.model('Users', DataSchema);
module.exports = users;
