const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');

const { allowRoles } = require('../middlewares/authorize');
const { authenticate } = require('../middlewares/auth');

// router.get('/idPlanet', reporteController.reporteMinluna);
// router.get('/idPlanet', reporteController.reporteCountlunas);
router.get('/idPlanet', authenticate,  allowRoles('admin', 'astro'), reporteController.reporteCount);

module.exports = router;
