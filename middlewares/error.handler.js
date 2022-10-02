function logErrors(err, req, res, next) {
  console.error(err);
  next();
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const {
      output: { statusCode, payload },
    } = err;
    res.status(statusCode).json(payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
