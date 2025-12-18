const sistemaplanetas = require('../config/sistemaplanetas');

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
