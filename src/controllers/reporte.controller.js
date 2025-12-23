const { planeta, luna } = require('../models');
const { Op, fn, col } = require('sequelize');

exports.reporteMinluna = async (req, res) => {
  try {
    const minluna = parseInt(req.query.minluna) || 0;

    const resultados = await planeta.findAll({
      attributes: [
        'idPlanet',
        'name',
        [fn('COUNT', col('luna.idPlanet')), 'totalluna']
      ],
      include: [
        {
          model: luna,
          as: 'luna',
          attributes: []
        }
      ],
      group: ['planeta.idPlanet'],
      having: {
        totalluna: {
          [Op.gte]: minluna
        }
      }
    });

    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el reporte' });
  }
};
