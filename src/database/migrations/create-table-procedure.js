'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("procedure",{
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
      is_dental:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
      },
      price: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: false
      }
    }),

  down: (queryInterface) => queryInterface.dropTable("procedure")
};
