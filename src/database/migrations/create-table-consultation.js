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
    price: {
      type: Sequelize.FLOAT(10, 2),
      allowNull: true
    },
    is_paid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    },
  }),

  down: (queryInterface) => queryInterface.dropTable("consultation")
};
