const express = require('express');
const router = express.Router();
const planetaController = require('../controllers/planeta.controller');

const { allowRoles } = require('../middlewares/authorize');
const { authenticate } = require('../middlewares/auth');

router.get('/', authenticate, allowRoles('admin', 'astro'), planetaController.getAllplaneta);
router.get('/:idPlanet', authenticate, allowRoles('admin', 'astro'), planetaController.getplanetaByidPlanet);
router.post('/', authenticate, allowRoles('admin'),  planetaController.createplaneta);
router.patch('/:idPlanet/luna/:idLuna', authenticate, allowRoles('admin'), planetaController.updatelunaRelation);
router.delete('/:idPlanet', authenticate, allowRoles('admin'),  planetaController.deleteplaneta);
router.patch('/:idPlanet/soft-delete', authenticate, allowRoles('admin'), planetaController.softDeleteplaneta);
router.patch('/:idPlanet/restore', authenticate, allowRoles('admin'), planetaController.restoreplaneta);
router.put('/:idPlanet', authenticate, allowRoles('admin'), planetaController.updateplaneta);



module.exports = router;
