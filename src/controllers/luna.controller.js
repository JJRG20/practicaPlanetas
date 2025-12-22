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
  try {
    const { idLuna } = req.params;

    const eliminado = await luna.destroy({
      where: { idLuna }
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

exports.restoreluna = async (req, res) => {
  try {
    const { idLuna } = req.params;

    const restaurado = await luna.restore({
      where: { idLuna }
    });

    if (!restaurado) {
      return res.status(404).json({
        message: 'Registro no encontrado o no eliminado'
      });
    }

    res.json({
      message: 'Registro de luna restaurado correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al restaurar el registro'
    });
  }
};

exports.updateluna = async (req, res) => {
  try {
    const { idLuna, idPlanet } = req.params;
    const { name, diameter, weight } = req.body;

    // Buscar registro (aunque esté soft-deleted)
    const registroL = await luna.findByPk(idLuna, { paranoid: false });
    if (!registroL) {
      return res.status(404).json({
        message: 'Registro de luna no encontrado'
      });
    }

    // Validar FK (planeta)
    if (idPlanet !== undefined) {
      const registroP = await planeta.findByPk(idPlanet);
      if (!registroP) {
        return res.status(400).json({
          message: 'El socio indicado no existe en planeta'
        });
      }
    }

    // PUT = reemplazo completo
    await registroL.update({
      name,
      diameter,
      weight
    });

    res.json({
      message: 'Registro actualizado completamente',
      registroL
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al actualizar el registro'
    });
  }
};