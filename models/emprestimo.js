module.exports = (sequelize, DataTypes) => {
    const emprestimo = sequelize.define('emprestimo',{        
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idUserEmp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idLivroEmp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{ timestamps: false });
    return emprestimo;
};