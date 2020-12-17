import Sequelize, { Model } from "sequelize";

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				name: Sequelize.STRING(100),
				username: Sequelize.STRING(20),
				password: Sequelize.STRING,
				is_office:Sequelize.BOOLEAN
			},
			{
				sequelize,
				tableName: 'user',
			}
		);

		return this;
	}
}

export default User