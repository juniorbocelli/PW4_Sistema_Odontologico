'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable("tooth", {
		code: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: false,
			allowNull: false,
			index: true
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false
		}
	}),

	down: (queryInterface) => queryInterface.dropTable("tooth")
};
