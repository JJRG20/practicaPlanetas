const sistemaplanetas = require('../config/sistemaplanetas');

exports.getAllplaneta = async (req, res) => {
  try {
    // 1. Traemos todo de planeta
    const [planetaRows] = await sistemaplanetas.query('SELECT * FROM planeta');

    // 2. Traemos todo de luna
    const [lunaRows] = await sistemaplanetas.query('SELECT * FROM luna');

    // 3. Asociamos luna a cada planeta
    const resultado = planetaRows.map(t1 => {
      return {
        ...t1,
        luna: lunaRows.filter(t2 => t2.idPlanet === t1.idPlanet)
      };
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
};

exports.getplanetaByidPlanet = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const [planetaRows] = await sistemaplanetas.query(
      'SELECT * FROM planeta WHERE idPlanet = ?',
      [id]
    );

    if (planetaRows.length === 0) {
      return res.status(404).json({ error: 'No encontrado' });
    }

    const [lunaRows] = await sistemaplanetas.query(
      'SELECT * FROM luna WHERE idPlanet = ?',
      [id]
    );

    res.json({
      ...planetaRows[0],
      luna: lunaRows
    });

  } catch (error) {
    console.error('ERROR REAL:', error);
    res.status(500).json({
      error: 'Error al obtener el registro',
      detalle: error.message
    });
  }
};

exports.createplaneta = async (req, res) => {
  const { name, diameter, weight, sunDist, time } = req.body;

  // Validaciones básicas
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name inválido' });
  }

  if (typeof diameter !== 'number') {
    return res.status(400).json({ error: 'diameter inválido' });
  }

  if (typeof weight !== 'number') {
    return res.status(400).json({ error: 'weight inválido' });
  }

  if (typeof sunDist !== 'number') {
    return res.status(400).json({ error: 'sunDist inválido' });
  }

  if (typeof time !== 'number') {
    return res.status(400).json({ error: 'time inválido' });
  }

  try {
    const [result] = await sistemaplanetas.query(
      'INSERT INTO planeta (name, diameter, weight, sunDist, time) VALUES (?, ?, ?, ?, ?)',
      [name, diameter, weight, sunDist, time]
    );

    res.status(201).json({
      idPlanet: result.insertId,
      name,
      diameter,
      weight,
      sunDist,
      time
    });

  } catch (error) {
    console.error('ERROR TABLA1:', error);
    res.status(500).json({
      error: 'Error al crear registro',
      detalle: error.message
    });
  }
};


