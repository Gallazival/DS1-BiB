const { sequelize, Sequelize } = require ('../config/database')

const empregados = require('../models/empregados')(sequelize,Sequelize)

// validator
// const { validationResult } = require('express-validator');

// function to make suitable validation to attached as a middleware to routers file

exports.pagResultado = async (req,res) => {
    const empregadosResultados = await empregados.findAll({
        order: [['id','ASC']]
    })
    // console.log(empregadosResultados)
    res.render("myresult", {empregadosResultados});
}

exports.formAdd = (req,res) => {
    res.render("myform");
}

exports.addEmpregado = async (req,res) => {
    const { nome, salario_bruto, depart } = req.body;
    await empregados.create({ nome, salario_bruto, depart });
    res.redirect('/');
}

exports.deletarEmpregado = async (req, res) => {
    const id = req.params.id;
        const empregadosResultados = await empregados.findAll({
        order: [['id','ASC']]
    })
    await empregados.destroy({ where: { id } });
    res.redirect('/');
};

exports.formEditar = async (req,res) => {
    const id = req.params.id;
    const empregadoResultado = await empregados.findByPk(id);
    res.render("myformedit", {empregadoResultado});
}

exports.editarEmpregado = async (req,res) => {
    const id = req.params.id;
    const {nome, salario_bruto, depart } = req.body;
    await empregados.update({nome, salario_bruto, depart}, { where: {id}});
    res.redirect('/');
}


exports.filtro = async (req,res) => {
    const Op = Sequelize.Op;
    const {filtro, salario} = req.body;
    const {setor} = req.body;
    console.log(salario)
    let empregadosResultados;
    if(setor == 0){
        empregadosResultados = await empregados.findAll({ where: {nome: {[Op.substring]: filtro}}, order: [['salario_bruto',salario]]});
    }else{
        empregadosResultados = await empregados.findAll({ where: {nome: {[Op.substring]: filtro}, depart: setor}, order: [['salario_bruto',salario]]});
    }
    res.render("myresult", {empregadosResultados});
}


