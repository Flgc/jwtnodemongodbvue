/**
 * file: src/models/user.model.js
 * Description: Responsável pelo modelo da classe 'User'
 * Data: 24/03/2021
 */


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, maxlength: 50, required: true},
  email: { type: String, maxlength: 30, required: true},
  password: { type: String, required: true},
  phone: { type: String, maxlength: 30, required: true},
  tokens: [
    { 
      token: { type: String, required: true }
    }
  ]
},{
  timestamps: true,
  collection: 'users',
});


// ==> Realiza o hash da senha antes de salvar a classe do modelo user
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8);
  }
  next(); 
});

// ==> Gera uma autenticação Auth para o user
userSchema.methods.generateAuthToken = async function(){
  const user = this;
  const token = jwt.sign({ _id: user._id, name: user.name, email: user.email, phone: user.phone}, 'secret');

  // ==> Armazena o Auth gerado  acima concatenado no array 'tokens'
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// ==> Faz uma pesquisa atravez de user por email, password ou phone
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new Error({ error: 'Login inválido!' });
  }

  // ==> Compara com a base de dados se a senha estacorreta
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error({ error: 'Senha inválida!' });
  }

  return user;
};

// ==> R
const User = mongoose.model('User', userSchema);

module.exports = User;
