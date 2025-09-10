'use strict';
const express = require('express');
const issueController = require('../controllers/issue');
const checkJWT = require('../middleware/checkJWT');

const router = express.Router();

router.post('/', checkJWT, issueController.createIssue);
router.get('/', checkJWT, issueController.listIssues);
router.post('/:issueId/attachment', checkJWT, issueController.uploadAttachment);

module.exports = router;
