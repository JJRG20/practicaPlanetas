const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { authenticate } = require('../middlewares/auth');
const { allowRoles } = require('../middlewares/authorize');

router.post('/',authenticate, allowRoles('admin'), usersController.createUser);

module.exports = router;
