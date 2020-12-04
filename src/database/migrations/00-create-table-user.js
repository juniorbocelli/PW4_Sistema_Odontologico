'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("user",{
    id:{
      type: Sequelize.INTEGER,
      allowNull:false,
      autoIncrement: true,
      primaryKey:true
    },
    name:{
      type: Sequelize.STRING(100),
      allowNull:false
    },
    mail: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    password:{
      type: Sequelize.STRING,
      allowNull: false
    },
    is_office: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    },
  }),

  down: (queryInterface) => queryInterface.dropTable("user")
};
