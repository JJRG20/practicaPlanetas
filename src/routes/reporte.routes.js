const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

const { allowRoles } = require('../middlewares/authorize');

// router.get('/idPlanet', reporteController.reporteMinluna);
// router.get('/idPlanet', reporteController.reporteCountlunas);
router.get('/idPlanet', allowRoles('admin', 'astro'), reporteController.reporteCount);

module.exports = router;
