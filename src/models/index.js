const planeta = require('./planeta');
const luna = require('./luna');
const User = require('./user');

planeta.hasMany(luna, {
  foreignKey: 'idPlanet',
  as: 'luna'
});

luna.belongsTo(planeta, {
  foreignKey: 'idPlanet',
  as: 'planeta'
});

module.exports = {
  planeta,
  luna,
  User
};
