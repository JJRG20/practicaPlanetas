const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const luna = require('./luna');

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
  timestamps: true,
  paranoid: true
});

planeta.addHook('beforeDestroy', async (planeta, options) => {
  await luna.destroy({
    where: { idPlanet: planeta.idPlanet },
    transaction: options.transaction
  });
});

module.exports = planeta;
