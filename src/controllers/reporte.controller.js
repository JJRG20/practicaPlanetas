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

    const mintime = req.query.mintime
      ? parseFloat(req.query.mintime)
      : null;

    const maxtime = req.query.maxtime
      ? parseFloat(req.query.maxtime)
      : null;

    const mindiameter = req.query.mindiameter
      ? parseFloat(req.query.mindiameter)
      : null;

    const maxdiameter = req.query.maxdiameter
      ? parseFloat(req.query.maxdiameter)
      : null;

    const minsunDist = req.query.minsunDist
      ? parseFloat(req.query.minsunDist)
      : null;

    const maxsunDist = req.query.maxsunDist
      ? parseFloat(req.query.maxsunDist)
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

    if (mintime !== null) {
      whereplaneta.time = {
        ...(whereplaneta.time || {}),
        [Op.gte]: mintime
      };
    }

    if (maxtime !== null) {
      whereplaneta.time = {
        ...(whereplaneta.time || {}),
        [Op.lte]: maxtime
      };
    }

    if (mindiameter !== null) {
      whereplaneta.diameter = {
        ...(whereplaneta.diameter || {}),
        [Op.gte]: mindiameter
      };
    }

    if (maxdiameter !== null) {
      whereplaneta.diameter = {
        ...(whereplaneta.diameter || {}),
        [Op.lte]: maxdiameter
      };
    }

    if (minsunDist !== null) {
      whereplaneta.sunDist = {
        ...(whereplaneta.sunDist || {}),
        [Op.gte]: minsunDist
      };
    }

    if (maxsunDist !== null) {
      whereplaneta.sunDist = {
        ...(whereplaneta.sunDist || {}),
        [Op.lte]: maxsunDist
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
        'diameter',
        'weight',
        'sunDist',
        'time',
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