'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable("client", {
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		cpf: {
			type: Sequelize.STRING(11),
			allowNull: false,
			unique: true
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		gender: {
			type: Sequelize.STRING(1),
			allowNull: false
		},
		birth_date: {
			type: Sequelize.DATEONLY,
			allowNull: false
		},
		mail: {
			type: Sequelize.STRING(100),
			allowNull: false,
			unique: true
		},
		phone: {
			type: Sequelize.STRING(10),
			allowNull: true
		},
		cell: {
			type: Sequelize.STRING(11),
			allowNull: false
		},
		is_validated_mail: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			default: false
		},
		token: {
			type: Sequelize.STRING,
			allowNull: false
		},
	}),

	down: (queryInterface) => queryInterface.dropTable("client")
};
