import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Client from '../app/models/entities/Client';
import Consultation from '../app/models/entities//Consultation';
import Procedure from '../app/models/entities/Procedure';
import Tooth from '../app/models/entities/Tooth';
import User from '../app/models/entities/User';

const models = [Client, Consultation, Procedure, Tooth, User];

class Database {
  constructor(){
      this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection))
      .map((model) => {
          if(model.associate) model.associate(this.connection.models);
          return model;
      })
  }
}

export default new Database();
