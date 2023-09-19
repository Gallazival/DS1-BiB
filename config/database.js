const Sequelize = require('sequelize')

sequelize = new Sequelize ({
    database: 'impostobd',
    password: '',
    host: 'localhost',
    username: 'root',
    dialect:'mysql'
} )

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}