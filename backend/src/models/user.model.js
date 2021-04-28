/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/models/user.model.js
 * Description: Responsável pelo modelo da classe 'User'
 * Data: 24/03/2021
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==> Define a Collection (Tabela = 'users')
const userSchema = new Schema(
  {
    name: { type: String, maxlength: 50, required: true },
    email: { type: String, maxlength: 30, required: true },
    password: { type: String, required: true },
    phone: { type: String, maxlength: 30, required: false },
    type: { type: Number, default: 1 }, // 1-User, 2-GrandUSER, 3-HIPER-FOCKING-BIG-MORE-THAN-YOUR-MOM-USER
    photo_profile: {
      type: String,
      default:
        "https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg",
    },
    renav: { type: String, maxlength: 30, required: false },
    plcar: { type: String, maxlength: 15, required: false },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// ==> Realiza o hash da senha antes de salvar a classe do modelo user
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// ==> Gera uma autenticação Auth para o user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email, phone: user.phone },
    "secret"
  );

  // ==> Armazena o Auth gerado  acima concatenado no array 'tokens'
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// ==> Faz uma pesquisa atravez de user por email e password
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error({ error: "Login inválido!" });
  }

  // ==> Compara com a base de dados se a senha estacorreta
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error({ error: "Login inválido!" });
  }

  return user;
};

// ==> Atualiza user
userSchema.statics.findOneAndUpdate = async (
  name,
  email,
  phone,
  renav,
  plcar
) => {
  const user = await User.findOne({ name });
  if (!user) {
    throw new Error({ error: "Usuário inválido!" });
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
