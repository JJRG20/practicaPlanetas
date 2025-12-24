const express = require('express');
const router = express.Router();
const planetaController = require('../controllers/planeta.controller');

const { allowRoles } = require('../middlewares/authorize');

router.get('/', allowRoles('admin', 'astro'), planetaController.getAllplaneta);
router.get('/:idPlanet', allowRoles('admin', 'astro'), planetaController.getplanetaByidPlanet);
router.post('/', allowRoles('admin'),  planetaController.createplaneta);
router.patch('/:idPlanet/luna/:idLuna', allowRoles('admin'), planetaController.updatelunaRelation);
router.delete('/:idPlanet', allowRoles('admin'),  planetaController.deleteplaneta);
router.patch('/:idPlanet/soft-delete', allowRoles('admin'), planetaController.softDeleteplaneta);
router.patch('/:idPlanet/restore', allowRoles('admin'), planetaController.restoreplaneta);
router.put('/:idPlanet', allowRoles('admin'), planetaController.updateplaneta);



module.exports = router;
