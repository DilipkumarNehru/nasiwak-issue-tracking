'use strict';
const express = require('express');
const projectController = require('../controllers/project');
const checkJWT = require('../middleware/checkJWT');
const roleAdminOnly = require('../middleware/roleAuthorization')(['Owner', 'Manager']);



const router = express.Router();

router.post('/', checkJWT, projectController.createProject);
router.get('/', checkJWT, projectController.listProjects);
router.post('/', checkJWT, roleAdminOnly, projectController.createProject);
module.exports = router;
