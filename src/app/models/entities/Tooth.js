import Sequelize, { Model } from "sequelize";

class Tooth extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.INTEGER,
        name: Sequelize.STRING(100)
      },
      {
        sequelize,
        tableName: 'tooth',
      }
    );

    return this;
  }

}

export default Tooth