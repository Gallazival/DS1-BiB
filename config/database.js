const Sequelize = require('sequelize')

sequelize = new Sequelize ({
    database: 'biblioteca',
    password: '',
    host: 'localhost',
    username: 'root',
    dialect:'mysql'
} )

module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}