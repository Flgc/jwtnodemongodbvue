/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/models/user.model.js
 * Description: Definin Users Model
 * Data: 13/05/2021
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
  {
    name_user: { type: String, maxlength: 50, required: true },
    email_user: { type: String, maxlength: 30, required: true },
    type_user: { type: Number, default: 1 }, // 1-User, 2-Admin
    password_user: { type: String, required: true },
    photo_profile_user: {
      type: String,
      default:
        'https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg',
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// ==> password hash before saved user model
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password_user')) {
    user.password_user = await bcrypt.hash(user.password_user, 10);
  }
  next();
});

// ==> Generate Auth for users
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id,
      name_user: user.name_user,
      email_user: user.email_user,
      type_user: user.type_user,
    },
    'secret'
  );

  // ==> Saving token
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// ==> Users Update
userSchema.statics.findOneAndUpdate = async (
  name_user,
  email_user,
  type_user,
  photo_profile_user
) => {
  const user = await User.findOne({ name_user });
  if (!user) {
    throw new Error({ error: 'Invalid user!' });
  }
  return user;
};

// ==> Is the password correct?
userSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password_user, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const Users = mongoose.model('Users', userSchema);
module.exports = Users;
