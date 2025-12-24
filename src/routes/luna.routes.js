const express = require('express');
const router = express.Router();
const lunaController = require('../controllers/luna.controller');

const { allowRoles } = require('../middlewares/authorize');
const { authenticate } = require('../middlewares/auth');

router.get('/:idLuna', authenticate, allowRoles('admin', 'astro'), lunaController.getlunaByidLuna);
router.post('/', authenticate, allowRoles('admin'), lunaController.createluna);
router.delete('/:idLuna', authenticate, allowRoles('admin'), lunaController.deleteluna);
router.patch('/:idLuna/soft-delete', authenticate, allowRoles('admin'), lunaController.softDeleteluna);
router.patch('/:idLuna/restore', authenticate, allowRoles('admin'), lunaController.restoreluna);
router.put('/:idLuna', authenticate, allowRoles('admin'), lunaController.updateluna);


module.exports = router;
