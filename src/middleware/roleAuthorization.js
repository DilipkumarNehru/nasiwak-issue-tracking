'use strict';
const api = require('../helpers/api');

// Expected to be used after checkJWT middleware which sets req.user
module.exports = function(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return api.forbidden(res, 'You do not have the required role to perform this action');
    }
    next();
  };
};
