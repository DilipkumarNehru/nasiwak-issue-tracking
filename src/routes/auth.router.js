const roleAdminOnly = require('../middleware/roleAuthorization')(['Owner', 'Manager']);
router.post('/', checkJWT, roleAdminOnly, projectController.createProject);
