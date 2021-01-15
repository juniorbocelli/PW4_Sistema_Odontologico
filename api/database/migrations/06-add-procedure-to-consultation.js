'use strict';
 
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn("consultation", "procedure_id", {
    type: Sequelize.INTEGER,
    references: { model: 'procedure', key: 'id'},
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    allowNull: false
  }),
 
  down: (queryInterface) => queryInterface.removeColumn('consultation', 'procedure_id')
};