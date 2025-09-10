const express = require('express');
const checkJWT = require('../middleware/checkJWT');
const roleAuthorization = require('../middleware/roleAuthorization'); // middleware for Owner role
const organizationController = require('../controllers/organization');

const router = express.Router();

router.post(
  '/',
  checkJWT,
  roleAuthorization(['Owner']),
  organizationController.createOrganization
);

router.get(
  '/',
  checkJWT,
  roleAuthorization(['Owner', 'Manager']),
  organizationController.listOrganizations
);

module.exports = router;
