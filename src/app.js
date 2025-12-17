const express = require('express');
const cors = require('cors');

const planetaRoutes = require('./routes/planeta.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/planeta', planetaRoutes);

module.exports = app;
