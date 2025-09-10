'use strict';

const Status = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

function respond(res, status, message, data = null) {
  return res.status(status).json({
    status,
    message,
    data,
  });
}

module.exports = {
  ok: (res, data, message = 'Success') => respond(res, Status.OK, message, data),
  badRequest: (res, message = 'Bad Request') => respond(res, Status.BAD_REQUEST, message),
  unauthorized: (res, message = 'Unauthorized') => respond(res, Status.UNAUTHORIZED, message),
  forbidden: (res, message = 'Forbidden') => respond(res, Status.FORBIDDEN, message),
  notFound: (res, message = 'Not Found') => respond(res, Status.NOT_FOUND, message),
  serverError: (res, message = 'Server Error') => respond(res, Status.SERVER_ERROR, message),
};
