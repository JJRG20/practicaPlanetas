const express = require('express');
const router = express.Router();
const planetaController = require('../controllers/planeta.controller');

router.get('/', planetaController.getAllplaneta);

module.exports = router;
