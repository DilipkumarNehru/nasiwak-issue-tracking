'use strict';
const express = require('express');
const userController = require('../controllers/user');
const checkJWT = require('../middleware/checkJWT');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', checkJWT, userController.getProfile)
// Add secured routes as needed, e.g., router.get('/profile', checkJWT, userController.profile);

module.exports = router;
