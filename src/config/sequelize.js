const { Sequelize, Op, Model, DataTypes } = require('sequelize');

function connection(){
    const conn = new Sequelize('pw4_sistema_odontologico', 'root', '', {
    host: 'localhost',
    dialect:'mariadb'
    });

    return conn;
};

module.exports = { connection, Sequelize, Model, DataTypes };