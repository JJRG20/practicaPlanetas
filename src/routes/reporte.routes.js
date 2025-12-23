const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

router.get('/idPlanet', reporteController.reporteMinluna);

module.exports = router;
