const { planeta, luna } = require('../models');
const { Op, fn, col } = require('sequelize');

exports.reporteCount = async (req, res) => {
  try {
    const minluna = req.query.minluna
      ? parseInt(req.query.minluna)
      : null;

    const maxluna = req.query.maxluna
      ? parseInt(req.query.maxluna)
      : null;
    
    const minweight = req.query.minweight
      ? parseFloat(req.query.minweight)
      : null;

    const maxweight = req.query.maxweight
      ? parseFloat(req.query.maxweight)
      : null;

    const whereplaneta = {};

    if (minweight !== null) {
      whereplaneta.weight = {
        ...(whereplaneta.weight || {}),
        [Op.gte]: minweight
      };
    }

    if (maxweight !== null) {
      whereplaneta.weight = {
        ...(whereplaneta.weight || {}),
        [Op.lte]: maxweight
      };
    }

    // Construir dinámicamente el HAVING
    const havingConditions = {};

    if (minluna !== null) {
      havingConditions.totalluna = {
        ...(havingConditions.totalluna || {}),
        [Op.gte]: minluna
      };
    }

    if (maxluna !== null) {
      havingConditions.totalluna = {
        ...(havingConditions.totalluna || {}),
        [Op.lte]: maxluna
      };
    }

    const resultados = await planeta.findAll({
      where: whereplaneta,
      attributes: [
        'idPlanet',
        'name',
        'weight',
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
      ...(Object.keys(havingConditions).length > 0 && {
        having: havingConditions
      })
    });

    res.json(resultados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el reporte' });
  }
};