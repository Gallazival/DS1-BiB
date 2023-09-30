const { sequelize, Sequelize } = require ('../config/database');

const user = require('../models/user')(sequelize,Sequelize);
const livros = require('../models/livros')(sequelize,Sequelize);
const emprestimo = require('../models/emprestimo')(sequelize,Sequelize);
const bcrypt = require('bcrypt');
// validator
// const { validationResult } = require('express-validator');



exports.pagLogin = async (req,res) => {
    const error = req.flash('error');
    res.render("Login", {error});
}

exports.pagFiltro = async (req,res) => {
    const error = req.flash('error');
    const ResultadoLivros = await livros.findAll();
    const Emprestimos = await emprestimo.findAll();
    const username = req.session.nome;
    const cargo = req.session.cargo;
    if(req.session && req.session.entrou){
    if(cargo==0){
    res.render("Pesquisa_livrosAdm", {ResultadoLivros , Emprestimos, username, cargo, error})
    }else{
    res.render("Pesquisa_livros", {ResultadoLivros , Emprestimos, username, cargo, error})
    }
  }else{
    res.redirect("/");
  }
}

exports.pagUsers = async (req,res) => {
    const ResultadoUsers = await user.findAll();
    res.render("Users", {ResultadoUsers});
}

exports.pagMeusLivros = async (req,res) => {
  const id = req.session.idUser;
    const ResultadoLivros = await emprestimo.findAll({
      where: { idUserEmp: id },
      include: [
        {
          model: livros,
          attributes: ['idLivro'],
          where: { idLivro: Sequelize.col('emprestimo.idLivroEmp') },
        },
      ],
    });
    console.log(ResultadoLivros)
    res.render("Users", {ResultadoLivros});
}

exports.auth = async (req, res, next) => {
  const {email, senha} = req.body;
  usuario = await user.findOne({where: {email : email}})
  if (usuario) {
    if (bcrypt.compareSync(senha, usuario.senha)){
      req.session.entrou = true;
      req.session.nome = usuario.nome;
      req.session.cargo = usuario.cargo;
      req.session.idUser = usuario.idUser;
      req.session.success = 'Usuário' + usuario.nome + 'logado.';
      res.redirect('/filtro');
    }else{
      req.flash('error', 'Senha incorreta, Login invalido!')
      res.redirect('/');
    }
  }else{
        req.flash('error', 'Email incorreta, Login invalido!')
      res.redirect('/');
  }
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

exports.pagCadastro = async (req,res) => {
    res.render("Cadastro");
}
exports.novoUser = async (req,res) => {
    const { nome, email, senha, cargo } = req.body;
    const senhaHash = await bcrypt.hash(senha, 12);
    let adm
    if(cargo!= 0){
        adm = 1
    }else{
      adm = 0
    }
    await user.create({ nome, email, senha:senhaHash, cargo:adm });
    res.redirect('/');
}

exports.addLivro = async (req,res) => {
    console.log(req.body)
    const { titulo, autor, ano, editora, quantidade } = req.body;
    await livros.create({ titulo, autor, ano, editora, quantidade });
    res.redirect('/filtro');
};

exports.pagAdd = async (req,res) => {
    res.render('Add_livros');
};


exports.deletarLivro =  async(req, res) => {
  const id = req.params.idLivro;
  await livros.destroy({ where: { idLivro : id } });
  await emprestimo.destroy({ where: {idLivroEmp: id}})
    res.redirect('/filtro');
  };

exports.pegaEmp = async(req, res, next) => {
  const id = req.params.idLivro;
  const user = req.session.idUser;
  let livro = await livros.findOne({where: {idLivro: id}});
  const qntLivroEmp = await emprestimo.count({where: {idLivroEmp: id}})
  console.log(qntLivroEmp);
  if(qntLivroEmp<livro.quantidade+qntLivroEmp){
     await emprestimo.create({idUserEmp:user, idLivroEmp:id});
     let quantidade = livro.quantidade-1;
     await livros.update({quantidade}, { where: { idLivro : id }});
     res.redirect('/filtro');
}else{
    req.flash('error', 'Não é possível pegar emprestado esse livro')
    res.redirect("/filtro")
  }
}

exports.devolveLivro =  async(req, res) => {
  const id = req.params.idLivroEmp;
  const qnt = await livros.findOne({where: {idLivro : id}}).quantidade;
  const {quantidade} = parseInt(qnt)+1;
  await livros.update({quantidade}, { where: { idLivro : id }});
  await emprestimo.destroy({ where: { id : id } });
  res.redirect('/filtro');
};

exports.deletarUser = async(req,res) => {
  const id = req.params.idUser;
  await user.destroy({where: { idUser : id } });
  res.redirect('/users');
}

exports.modLivro = async (req,res) => {
    const id = req.params.idLivro;
    const {titulo, autor, ano, editora} = req.body;
    console.log({titulo, autor, ano, editora})
    await livros.update({titulo, autor, ano ,editora}, { where: {idLivro : id}});
    res.redirect('/filtro');
}

exports.modUser = async (req,res) => {
  console.log(req.params.idUser)
   const id = req.params.idUser;
   const {nome, email, cargo} = req.body;
   await user.update({nome, email, cargo}, { where: {idUser : id}});
   res.redirect('/users');
}

exports.pagModLivro = async (req,res) => {
   const id = req.params.idLivro;
   const ResultadoLivros = await livros.findByPk(id);
   res.render("Edit_Livros", {ResultadoLivros, idLivro: id});
}


exports.pagModUser = async (req,res) => {
   const id = req.params.idUser;
   const ResultadoUsers = await user.findByPk(id);
   res.render("Edit_User", {ResultadoUsers, idUser: id});
}