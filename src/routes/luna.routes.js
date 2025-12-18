const express = require('express');
const router = express.Router();
const lunaController = require('../controllers/luna.controller');

router.post('/', lunaController.createluna);

module.exports = router;
