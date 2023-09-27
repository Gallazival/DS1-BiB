const { sequelize, Sequelize } = require ('../config/database')

// const user = require('../models/user')(sequelize,Sequelize)
// const livros = require('../models/user')(sequelize,Sequelize)
// const emprestimos = require('../models/user')(sequelize,Sequelize)
// validator
// const { validationResult } = require('express-validator');



exports.pagLogin = async (req,res) => {
    res.render("Login");
}

exports.validator = async (req,res) => {
    res.render("Pesquisa_livros");
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


