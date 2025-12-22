const planeta = require('./planeta');
const luna = require('./luna');

planeta.hasMany(luna, {
  foreignKey: 'idPlanet'
});

luna.belongsTo(planeta, {
  foreignKey: 'idPlanet'
});

module.exports = {
  planeta,
  luna
};
