const { planeta, luna } = require('../models');

exports.getAllplaneta = async (req, res) => {
  try {
    const data = await planeta.findAll({
      include: [{
        model: luna,
        as: 'luna',
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
        as: 'luna',
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
  try {
    const { idPlanet } = req.params;

    // Buscar incluso si está soft-deleted
    const registroP = await planeta.findByPk(idPlanet, { paranoid: false });

    if (!registroP) {
      return res.status(404).json({
        message: 'Registro no existe'
      });
    }

    await planeta.destroy({
      where: { idPlanet },
      force: true
    });

    res.json({
      message: 'Registro eliminado permanentemente'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al eliminar definitivamente'
    });
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
  try {
    const { idPlanet } = req.params;
    const { name, diameter, weight, sunDist, time } = req.body;

    // Buscar registro (aunque esté soft-deleted)
    const registroP = await planeta.findByPk(idPlanet, { paranoid: false });
    if (!registroP) {
      return res.status(404).json({
        message: 'Registro de planeta no encontrado'
      });
    }

    // PUT = reemplazo completo
    await registroP.update({
      name,
      diameter,
      weight,
      sunDist,
      time
    });

    res.json({
      message: 'Registro actualizado completamente',
      registroP
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al actualizar el registro'
    });
  }
};