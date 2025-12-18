const express = require('express');
const cors = require('cors');

const planetaRoutes = require('./routes/planeta.routes');
const lunaRoutes = require('./routes/luna.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/planeta', planetaRoutes);
app.use('/api/luna', lunaRoutes);

module.exports = app;



