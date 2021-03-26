/**
 * file: src/controllers/user.controllers.js
 * Description: Responsável pelo CRUD da classe: 'User'
 * Data: 26/03/2021
 */

const User = require('../models/user.model');

// ==> Async e await

// ==> Método responsável por verificar se o email informado do novo cadastro já existe na base de dados
exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ email: req.body.email });
    console.log(isUser);

    if (isUser.length >= 1) {
      return res.status(409).json({ message: 'Sorry! This email is already registered!'})
    }

    // ==> Registra o novo login e senha
    const newUser = new User(req.body);
    const user = await newUser.save(); // ==> '.save' é do mongoose armazena o login e senha que esta na tela nessa variavel 

    // ==> Gera o token  para liberar o novo registro
    const token = await newUser.generateAuthToken();
    res.status(201).json({ message: 'User created successfully!', user, token });    
  } catch (err) {
    res.status(400).json({ err: err })
  }
};

// ==> Método responsável por verificar se o email informado no login existe na base de dados
exports.loginUser = async (req, res) => 
{
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user =  await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Erro ao realizar login! Verifique suas credenciais!' }); 
    }

    // ==> Gera o token para o usuário
    const token = await user.generateAuthToken();
    res.status(201).json({ message: 'Usuário(a) logado com sucesso!', user, token });

  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// ==> Método responsável por verificar se o email informado no login existe na base de dados
exports.returnUserProfile = async (req, res) => {}