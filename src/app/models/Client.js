import Sequelize, { Model } from "sequelize";

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: Sequelize.STRING(11),
        name: Sequelize.STRING(100),
        gender: Sequelize.STRING(1),
        birth_date:Sequelize.DATEONLY,
        mail: Sequelize.STRING(100),
        phone: Sequelize.STRING(10),
        cell: Sequelize.STRING(11),
        is_validated_mail: Sequelize.BOOLEAN
      },
      {
        sequelize,
        tableName: 'client',
      }
    );

    return this;
  }
}

export default Client