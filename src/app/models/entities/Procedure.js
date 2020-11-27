import Sequelize, { Model } from "sequelize";

class Procedure extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(100),
        price: Sequelize.DOUBLE(10, 2),
        is_dental: Sequelize.BOOLEAN
      },
      {
        sequelize,
        tableName: 'procedure',
      }
    );

    return this;
  }
}

export default Procedure