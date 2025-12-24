require('dotenv').config();

const express = require('express');
const cors = require('cors');

const planetaRoutes = require('./routes/planeta.routes');
const lunaRoutes = require('./routes/luna.routes');
const reporteRoutes = require('./routes/reporte.routes');
const usersRoutes = require('./routes/users.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/planeta', planetaRoutes);
app.use('/api/luna', lunaRoutes);
app.use('/api/reporte', reporteRoutes);

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;



