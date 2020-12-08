'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("consultation",{
    id:{
      type: Sequelize.INTEGER,
      allowNull:false,
      autoIncrement: true,
      primaryKey:true
    },
    time:{
      type: Sequelize.DATE,
      allowNull:false
    },
    value: {
      type: Sequelize.DOUBLE(10, 2),
      allowNull: true
    },
    is_paid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    },
    is_confirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      default: null
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }),

  down: (queryInterface) => queryInterface.dropTable("consultation")
};
