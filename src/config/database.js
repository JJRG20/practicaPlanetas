const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'sistemaplanetas',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
  }
);

module.exports = sequelize;
