import Sequelize, { Model } from "sequelize";

class GeneralProcedure extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING(100),
        price: Sequelize.FLOAT(10, 2)
      },
      {
        sequelize,
        tableName: 'general_procedure',
      }
    );

    return this;
  }
}

export default GeneralProcedure