const express = require('express');
const router = express.Router();
const planetaController = require('../controllers/planeta.controller');

router.get('/', planetaController.getAllplaneta);
router.get('/:idPlanet', planetaController.getplanetaByidPlanet);
router.post('/', planetaController.createplaneta);
router.patch('/:idPlanet/luna/:idLuna', planetaController.updatelunaRelation);
router.delete('/:idPlanet', planetaController.deleteplaneta);
router.patch('/:idPlanet/soft-delete', planetaController.softDeleteplaneta);



module.exports = router;
