/**
 * Project: "PA IGTI - Controle de Manutenção API com Node.js & MongoDb"
 *
 * file: src/controllers/user.controllers.js
 * Description: Responsável pelo CRUD da classe: 'User'
 * Data: 26/03/2021
 */

const User = require("../models/user.model");

// ==> conceito de Async e Await

// ==> Método responsável por verificar se o email informado do novo cadastro já existe na base de dados
exports.registerNewUser = async (req, res) => {
  try {
    // => Verificando se o usuário já possui algum e-mail já cadastrado:
    const isUser = await User.find({ email: req.body.email });

    if (isUser.length >= 1) {
      return res
        .status(409)
        .json({ message: "Atenção! E-mail já registrado anteriormente!" });
    }

    // ==> Registra o novo usuário
    const newUser = new User(req.body);
    const user = await newUser.save(); // ==> '.save' é do mongoose armazena o login e senha que esta na variavel 'newUser'

    // ==> Gera o token para novo usuário
    const token = await newUser.generateAuthToken();
    res
      .status(201)
      .json({ message: "Usuário(a) registrado(a) com sucesso!", user, token });
  } catch (err) {
    res.status(400).json({ err });
  }
};

// ==> Método responsável por realizar novo login 'User':
exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.findByCredentials(email, password);

    // ==> TODO  Não esta retornando o error
    if (!user) {
      return res.status(401).json({
        error: "Erro ao Logar! Verifique suas credenciais de autenticação!",
      });
    }

    // ==> Gera o token para o usuário
    const token = await user.generateAuthToken();

    return res
      .status(201)
      .json({ message: "Usuário(a) logado com sucesso!", user, token });
  } catch (err) {
    res.status(400).json({ err });
  }
};

// ==> Retorna os dados do usuário logado através do token armazenado na base de dados
exports.returnUserProfile = async (req, res) => {
  await res.json(req.userData);
};

// ==> Retorna todos usuário cadastrados na base de dados
exports.returnAllUser = async (req, res) => {
  User.find(function (err, user) {
    if (err)
      res.status(401).json({ message: "Erro ao listar usuários..:" + err });

    res.json(user);
  });
};

// ==> Rota responsavel por retornar usuário por Id
exports.returnUserId = async (req, res) => {
  User.findById(req.params.user_id, function (error, user) {
    if (error) res.status(401).json({ message: "Id inválido..: " + error });

    res.json(user);
  });
};

// ==> Rota responsavel por atualizar usuário por Id
exports.updtUser = async (req, res) => {
  var user = new User();
  //Primeiro - Procurar o ID
  User.findById(req.params.user_id, function (error, user) {
    if (error) res.status(401).json({ message: "Id inválido!" });
  });

  //Segundo - Após achar atualiza os objetos
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  user.phone = req.body.phone;
  user.renav = req.body.renav;
  user.plcar = req.body.plcar;

  //Terceiro - Persistir as propriedades no dados no banco
  user.update(function (error) {
    if (error)
      res
        .status(400)
        .json({ message: "Error ao atualizar o usuário..: " + error });

    res
      .status(201)
      .json({ message: "Usuário(a) atualizado com sucesso!", user });
  });
};
