module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        senha: {
            type: DataTypes.STRING
        },
        
    },{ timestamps: false });
    const livros = sequelize.define('livros', {
        idLivro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING
        },
        autor: {
            type: DataTypes.STRING
        },
        ano: {
            type: DataTypes.STRING
        },
        editora: {
            type: DataTypes.STRING
        },
        quantidade: {
            type: DataTypes.INTEGER
        },
    },{ timestamps: false });
    const emprestimo = sequelize.define('emprestimos',{        
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
        }},{ timestamps: false });
user.hasMany(emprestimo,  { 
    as: 'idUserEmp',
    foreignKey: 'idUser',
    constraints: false});
livros.hasMany(emprestimo,{
    as: 'idLivroEmp',
    foreignKey: 'idLivro',
    constraints: false});
    return user, livros, emprestimo;
};