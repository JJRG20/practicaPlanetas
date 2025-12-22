const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const luna = sequelize.define('luna', {
  idLuna: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  diameter: {
    type: DataTypes.DOUBLE
  },
  weight: {
    type: DataTypes.DOUBLE
  },
  idPlanet: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'luna',
  timestamps: false,
  paranoid: true,
  deletedAt: 'deletedAt'
});

module.exports = luna;
