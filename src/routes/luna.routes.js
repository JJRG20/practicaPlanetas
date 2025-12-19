const express = require('express');
const router = express.Router();
const lunaController = require('../controllers/luna.controller');

router.post('/', lunaController.createluna);
router.delete('/:idLuna', lunaController.deleteluna);
router.patch('/:idLuna/soft-delete', lunaController.softDeleteluna);


module.exports = router;
