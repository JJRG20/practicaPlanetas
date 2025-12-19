const sistemaplanetas = require('../config/sistemaplanetas');

exports.getlunaByidLuna = async (req, res) => {
  const idLuna = Number(req.params.idLuna);

  if (!Number.isInteger(idLuna)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const [lunaRows] = await sistemaplanetas.query(
      'SELECT * FROM luna WHERE idLuna = ? AND deletedAt IS NULL',
      [idLuna]
    );

    if (lunaRows.length === 0) {
      return res.status(404).json({ error: 'No encontrado' });
    }

    res.json({
      ...lunaRows[0]
    });

  } catch (error) {
    console.error('ERROR REAL:', error);
    res.status(500).json({
      error: 'Error al obtener el registro',
      detalle: error.message
    });
  }
};

exports.createluna = async (req, res) => {
  const { name, diameter, weight, idPlanet } = req.body;

  // Validaciones
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name inválido' });
  }

  if (typeof diameter !== 'number') {
    return res.status(400).json({ error: 'diameter inválido' });
  }

  if (typeof weight !== 'number') {
    return res.status(400).json({ error: 'weight inválido' });
  }

  if (!Number.isInteger(idPlanet)) {
    return res.status(400).json({ error: 'idPlanet inválido' });
  }

  try {
    // Verificar que exista planeta
    const [exists] = await sistemaplanetas.query(
      'SELECT idPlanet FROM planeta WHERE idPlanet = ?',
      [idPlanet]
    );

    if (exists.length === 0) {
      return res.status(404).json({ error: 'planeta no existe' });
    }

    // Insertar en luna
    const [result] = await sistemaplanetas.query(
      'INSERT INTO luna (name, diameter, weight, idPlanet) VALUES (?, ?, ?, ?)',
      [name, diameter, weight, idPlanet]
    );

    res.status(201).json({
      idLuna: result.insertId,
      name,
      diameter,
      weight,
      idPlanet
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear registro en luna' });
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