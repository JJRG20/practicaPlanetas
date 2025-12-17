const express = require('express');
const router = express.Router();
const planetaController = require('../controllers/planeta.controller');

router.get('/', planetaController.getAllplaneta);
router.get('/:id', planetaController.getplanetaByidPlanet);

module.exports = router;
