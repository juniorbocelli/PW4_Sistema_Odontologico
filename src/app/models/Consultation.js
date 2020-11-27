import Sequelize, { Model } from "sequelize";

class Consultation extends Model {
  static init(sequelize) {
    super.init(
      {
        time: Sequelize.DATE,
        value: Sequelize.FLOAT(10, 2),
        is_paid: Sequelize.BOOLEAN,
        is_confirmed: Sequelize.BOOLEAN
      },
      {
        sequelize,
        tableName: 'consultation',
      }
    );

    return this;
  }

  static associate(models){
    this.belongsTo(models.Client, {
        foreignKey: 'client_id',
        as: 'client',
    });

    this.belongsTo(models.Procedure, {
        foreignKey: 'procedure_id',
        as: 'procedure',
    });

    this.belongsTo(models.Tooth, {
        foreignKey: 'tooth_code',
        as: 'tooth',
    });

  }
}

export default Consultation