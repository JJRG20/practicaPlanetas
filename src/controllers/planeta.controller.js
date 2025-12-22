const { planeta, luna } = require('../models');

exports.getAllplaneta = async (req, res) => {
  try {
    const data = await planeta.findAll({
      include: {
        model: luna
      }
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
      include: {
        model: luna
      }
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
  const idPlanet = Number(req.params.idPlanet);
  const idLuna = Number(req.params.idLuna);

  // Validaciones básicas
  if (!Number.isInteger(idPlanet) || !Number.isInteger(idLuna)) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }

  try {
    // Verificar que exista planeta
    const [planeta] = await sistemaplanetas.query(
      'SELECT idPlanet FROM planeta WHERE idPlanet = ?',
      [idPlanet]
    );

    if (planeta.length === 0) {
      return res.status(404).json({ error: 'planeta no existe' });
    }

    // Verificar que exista luna
    const [luna] = await sistemaplanetas.query(
      'SELECT idLuna FROM luna WHERE idLuna = ?',
      [idLuna]
    );

    if (luna.length === 0) {
      return res.status(404).json({ error: 'luna no existe' });
    }

    // Actualizar relación
    await sistemaplanetas.query(
      'UPDATE luna SET idPlanet = ? WHERE idLuna = ?',
      [idPlanet, idLuna]
    );

    res.json({
      mensaje: 'Relación actualizada correctamente',
      luna: {
        idLuna: idLuna,
        idPlanet: idPlanet
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la relación' });
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
  const idPlanet = Number(req.params.idPlanet);

  if (!Number.isInteger(idPlanet)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const connection = await sistemaplanetas.getConnection();

  try {
    await connection.beginTransaction();

    // Soft delete planeta
    const [resplaneta] = await connection.query(
      'UPDATE planeta SET deletedAt = NOW() WHERE idPlanet = ? AND deletedAt IS NULL',
      [idPlanet]
    );

    if (resplaneta.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Registro no encontrado o ya eliminado' });
    }

    // Soft delete luna asociadas
    await connection.query(
      'UPDATE luna SET deletedAt = NOW() WHERE idPlanet = ? AND deletedAt IS NULL',
      [idPlanet]
    );

    await connection.commit();

    res.json({ mensaje: 'Soft delete aplicado a planeta y luna asociadas' });

  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error en soft delete' });
  } finally {
    connection.release();
  }
};

exports.restoreplaneta = async (req, res) => {
  const idPlanet = Number(req.params.idPlanet);

  if (!Number.isInteger(idPlanet)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const connection = await sistemaplanetas.getConnection();

  try {
    await connection.beginTransaction();

    // Restore planeta
    const [resplaneta] = await connection.query(
      'UPDATE planeta SET deletedAt = NULL WHERE idPlanet = ? AND deletedAt IS NOT NULL',
      [idPlanet]
    );

    if (resplaneta.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Registro no estaba eliminado o no existe' });
    }

    // Restore luna asociadas
    await connection.query(
      'UPDATE luna SET deletedAt = NULL WHERE idPlanet = ? AND deletedAt IS NOT NULL',
      [idPlanet]
    );

    await connection.commit();

    res.json({ mensaje: 'Registro restaurado correctamente' });

  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error al restaurar' });
  } finally {
    connection.release();
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
