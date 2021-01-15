'use strict';
 
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn("consultation", "tooth_code", {
    type: Sequelize.INTEGER,
    references: { model: 'tooth', key: 'code'},
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true
  }),
 
  down: (queryInterface) => queryInterface.removeColumn('consultation', 'tooth_code')
};