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
