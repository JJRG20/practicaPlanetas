const app = require('./src/app');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const sequelize = require('./src/config/database');

sequelize.authenticate()
  .then(() => console.log('Conectado a MySQL con Sequelize'))
  .catch(err => console.error('Error de conexión:', err));
