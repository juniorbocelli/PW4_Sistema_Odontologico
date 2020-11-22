const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('pw4_sistema_odontologico', 'root', '', {
    host: 'localhost',
    dialect:'mariadb'
});

// const my_connection = async() => {
//     let connection;

//     try {
//         connection = await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         connection = null;
//     }

//     return connection;
// }

// my_connection()


class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();
