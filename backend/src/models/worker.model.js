/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/models/worker.model.js
 * Description: Responsável pelo modelo da classe 'Worker'
 * Data: 27/04/2021
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

// ==> Define a Collection (Tabela = 'worker')

const usersSchema = new Schema(
  {
    nome_usuario: String,
    email_usuario: String,
    tipo_usuario: { type: Number, default: 1 }, // 1-User, 2-GrandUSER, 3-HIPER-FOCKING-BIG-MORE-THAN-YOUR-MOM-USER
    senha_usuario: String,
    foto_perfil: {
      type: String,
      default:
        "https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg",
    },
  },
  {
    timestamps: true,
    collection: "users_0",
  }
);

usersSchema.pre("save", function (next) {
  if (!this.isModified("senha_usuario")) {
    return next();
  }
  this.senha_usuario = bcrypt.hashSync(this.senha_usuario, 10);
  next();
});

usersSchema.pre("findOneAndReplace", function (next) {
  var password = this.getUpdate().senha_usuario + "";
  if (password.length < 55) {
    this.getUpdate().senha_usuario = bcrypt.hashSync(password, 10);
  }
  next();
});

usersSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.senha_usuario, function (err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
};

const UsersSchema = mongoose.model("UsersSchema", usersSchema);

module.exports = UsersSchema;
