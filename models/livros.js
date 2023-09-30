module.exports = (sequelize, DataTypes) => {
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
    return livros;
};