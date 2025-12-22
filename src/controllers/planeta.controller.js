const { planeta, luna } = require('../models');

exports.getAllplaneta = async (req, res) => {
  try {
    const data = await planeta.findAll({
      include: [{
        model: luna,
        required: false
      }]
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al obtener planeta'
    });
  }
};


exports.getplanetaByidPlanet = async (req, res) => {
  try {
    const { idPlanet } = req.params;

    const registro = await planeta.findByPk(idPlanet, {
      include: [{
        model: luna,
        required: false
      }]
    });

    if (!registro) {
      return res.status(404).json({
        message: 'Registro no encontrado'
      });
    }

    res.json(registro);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al obtener el registro'
    });
  }
};

exports.createplaneta = async (req, res) => {
  try {
    const { name, diameter, weight, sunDist, time } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'llene todos los datos obligatorios'
      });
    }

    const nuevo = await planeta.create({
      name,
      diameter,
      weight,
      sunDist,
      time
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al crear el registro'
    });
  }
};



exports.updatelunaRelation = async (req, res) => {
  try {
    const { idPlanet, idLuna } = req.params;

    // Verificar que exista el nuevo planeta
    const registroP = await planeta.findByPk(idPlanet);
    if (!registroP) {
      return res.status(404).json({
        message: 'planeta destino no existe'
      });
    }

    // Verificar que exista luna
    const registroL = await luna.findByPk(idLuna);
    if (!registroL) {
      return res.status(404).json({
        message: 'Registro de luna no existe'
      });
    }

    // Actualizar SOLO la relación
    registroL.idPlanet = idPlanet;
    await registroL.save();

    res.json({
      message: 'Asociación corregida correctamente',
      luna
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al corregir la asociación'
    });
  }
};

exports.deleteplaneta = async (req, res) => {
  const idPlanet = Number(req.params.idPlanet);

  if (!Number.isInteger(idPlanet)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const [result] = await sistemaplanetas.query(
      'DELETE FROM planeta WHERE idPlanet = ?',
      [idPlanet]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.json({
      mensaje: 'Registro de planeta y sus lunas eliminado correctamente',
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar registro' });
  }
};

exports.softDeleteplaneta = async (req, res) => {
  try {
    const { idPlanet } = req.params;

    const eliminado = await planeta.destroy({
      where: { idPlanet }//, individualHooks: true
    });

    if (!eliminado) {
      return res.status(404).json({
        message: 'Registro no encontrado'
      });
    }

    res.json({
      message: 'Registro eliminado correctamente (soft delete)'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al eliminar el registro'
    });
  }
};

exports.restoreplaneta = async (req, res) => {
  try {
    const { idPlanet } = req.params;

    const restaurado = await planeta.restore({
      where: { idPlanet }
    });

    if (!restaurado) {
      return res.status(404).json({
        message: 'Registro no encontrado o no eliminado'
      });
    }

    res.json({
      message: 'Registro de planeta restaurado correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al restaurar el registro'
    });
  }
};

exports.updateplaneta = async (req, res) => {
  const idPlanet = Number(req.params.idPlanet);
  const { name, diameter, weight, sunDist, time } = req.body;

  // Validaciones
  if (!Number.isInteger(idPlanet)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (!name || typeof diameter !== 'number' || typeof weight !== 'number' || typeof sunDist !== 'number' || typeof time !== 'number') {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios (PUT)'
    });
  }

  try {
    const [result] = await sistemaplanetas.query(
      `
      UPDATE planeta
      SET name = ?, diameter = ?, weight = ?, sunDist = ?, time = ?
      WHERE idPlanet = ? AND deletedAt IS NULL
      `,
      [name, diameter, weight, sunDist, time, idPlanet]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Registro no encontrado o eliminado'
      });
    }

    res.json({ mensaje: 'Registro actualizado correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar planeta' });
  }
};
