const { luna } = require('../models');

exports.getlunaByidLuna = async (req, res) => {
  try {
    const { idLuna } = req.params;

    const registro = await luna.findByPk(idLuna, {

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

exports.createluna = async (req, res) => {
  try {
    const { name, diameter, weight, idPlanet } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'llene todos los datos obligatorios'
      });
    }

    const nuevo = await luna.create({
      name,
      diameter,
      weight,
      idPlanet
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al crear el registro'
    });
  }
};

exports.deleteluna = async (req, res) => {
  const idLuna = Number(req.params.idLuna);

  if (!Number.isInteger(idLuna)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const [result] = await sistemaplanetas.query(
      'DELETE FROM luna WHERE idLuna = ?',
      [idLuna]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.json({
      mensaje: 'Registro de luna eliminado',
      idLuna
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar registro' });
  }
};

exports.softDeleteluna = async (req, res) => {
  const idLuna = Number(req.params.idLuna);

  if (!Number.isInteger(idLuna)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const [result] = await sistemaplanetas.query(
      'UPDATE luna SET deletedAt = NOW() WHERE idLuna = ? AND deletedAt IS NULL',
      [idLuna]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registro no encontrado o ya eliminado' });
    }

    res.json({ mensaje: 'Registro de luna eliminado lógicamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en soft delete' });
  }
};

exports.restoreluna = async (req, res) => {
  const idLuna = Number(req.params.idLuna);

  if (!Number.isInteger(idLuna)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const [result] = await sistemaplanetas.query(
      'UPDATE luna SET deletedAt = NULL WHERE idLuna = ? AND deletedAt IS NOT NULL',
      [idLuna]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Registro no eliminado o no existe' });
    }

    res.json({ mensaje: 'Registro de luna restaurado correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al restaurar' });
  }
};

exports.updateluna = async (req, res) => {
  const idLuna = Number(req.params.idLuna);
  const { name, diameter, weight } = req.body;

  // Validaciones
  if (!Number.isInteger(idLuna)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (!name || typeof diameter !== 'number' || typeof weight !== 'number') {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios (PUT)'
    });
  }

  try {
    const [result] = await sistemaplanetas.query(
      `
      UPDATE luna
      SET name = ?, diameter = ?, weight = ?
      WHERE idLuna = ? AND deletedAt IS NULL
      `,
      [name, diameter, weight, idLuna]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: 'Registro no encontrado o eliminado'
      });
    }

    res.json({ mensaje: 'Registro actualizado correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar luna' });
  }
};