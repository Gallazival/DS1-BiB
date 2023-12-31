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
        cargo: {
            type: DataTypes.INTEGER,
        }
    },{ timestamps: false });
    return user;
};