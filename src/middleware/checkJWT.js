'use strict';
const jwt = require('jsonwebtoken');
const api = require('../helpers/api');
require('dotenv').config();

module.exports = function checkJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return api.unauthorized(res, 'Token missing or malformed');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return api.unauthorized(res, 'Invalid or expired token');
    }
    req.user = decoded;
    next();
  });
};
