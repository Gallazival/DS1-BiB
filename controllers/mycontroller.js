const { sequelize, Sequelize } = require ('../config/database')

const user = require('../models/user')(sequelize,Sequelize)
const livros = require('../models/user')(sequelize,Sequelize)
const emprestimos = require('../models/user')(sequelize,Sequelize)
// validator
// const { validationResult } = require('express-validator');



exports.pagLogin = async (req,res) => {
    res.render("Login");
}

exports.validator = async (req,res) => {
    const ResultadoLivros = await livros.findAll();
    const Emprestimos = await emprestimos.findAll();
    res.render("Pesquisa_livros", {ResultadoLivros , Emprestimos})
}

exports.auth = async (req, res) => {
  const {nome, email, senha} = req.body;
  user.findOne({where: {email : email}}).then(async function (find){
    if (bcrypt.compareSync(senha, find.senha)){
      req.session.entrou = true;
      req.session.nome = {nome}
      req.session.success = 'Usuário' + find.nome + 'logado.'
      res.redirect('/filtro')
    }
    else{
      console.log('Senha incorreta!');
      res.redirect('/');
    }
  });
};

exports.logout = async (req, res) => {
  if (req.session.entrou == true) {
    req.session.destroy();
  }
  res.redirect('/');
}

// exports.filtro = async (req,res) => {
//     const Op = Sequelize.Op;
//     const {filtro, salario} = req.body;
//     const {setor} = req.body;
//     console.log(salario)
//     let empregadosResultados;
//     if(setor == 0){
//         empregadosResultados = await empregados.findAll({ where: {nome: {[Op.substring]: filtro}}, order: [['salario_bruto',salario]]});
//     }else{
//         empregadosResultados = await empregados.findAll({ where: {nome: {[Op.substring]: filtro}, depart: setor}, order: [['salario_bruto',salario]]});
//     }
//     res.render("myresult", {empregadosResultados});
// }

exports.novoUser = async (req,res) => {
    const { nome, email, senha } = req.body;
    bcrypt.hash({ senha }, 12).then(hash => {
    data.password = hash; 
    });
    await users.create({ nome, email, senha });
    res. redirect('/');
}

exports.addLivro = async (req,res) => {
    const { titulo, autor, ano, editora, quantidade } = req.body;
    await livros.create({ titulo, autor, ano, editora, quantidade });
    res.redirect('/filtro');
};

exports.deletarLivro =  async(req, res) => {
  const id = req.params.idLivro;
  const qnt = req.params.quantidade;
  if(qnt == 1){
    await livros.destroy({ where: { id } });
    res.redirect('/filtro');
  }
  else if(qnt >= 2) {
  const {quantidade} = int(qnt)-1;
    await livros.update({quantidade}, { where: { id }});
    res.redirect('/filtro');
  }
};