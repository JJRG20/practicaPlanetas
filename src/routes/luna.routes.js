const express = require('express');
const router = express.Router();
const lunaController = require('../controllers/luna.controller');

const { allowRoles } = require('../middlewares/authorize');

router.get('/:idLuna', allowRoles('admin', 'astro'), lunaController.getlunaByidLuna);
router.post('/', allowRoles('admin'), lunaController.createluna);
router.delete('/:idLuna', allowRoles('admin'), lunaController.deleteluna);
router.patch('/:idLuna/soft-delete', allowRoles('admin'), lunaController.softDeleteluna);
router.patch('/:idLuna/restore', allowRoles('admin'), lunaController.restoreluna);
router.put('/:idLuna', allowRoles('admin'), lunaController.updateluna);


module.exports = router;
