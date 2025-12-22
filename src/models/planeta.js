const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const planeta = sequelize.define('planeta', {
  idPlanet: {
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
  sunDist: {
    type: DataTypes.DOUBLE
  },
  time: {
    type: DataTypes.DOUBLE
  }
}, {
  tableName: 'planeta',
  timestamps: false,
  paranoid: true,
  deletedAt: 'deletedAt'
});

module.exports = planeta;
