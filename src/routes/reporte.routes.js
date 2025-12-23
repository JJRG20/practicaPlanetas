const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

// router.get('/idPlanet', reporteController.reporteMinluna);
router.get('/idPlanet', reporteController.reporteCountlunas);

module.exports = router;
