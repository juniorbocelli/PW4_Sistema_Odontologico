'use strict';
 
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn("consultation", "client_id", {
    type: Sequelize.INTEGER,
    references: { model: 'client', key: 'id'},
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: false
  }),
 
  down: (queryInterface) => queryInterface.removeColumn('consultation', 'client_id')
};