const {ValidationError} = require('sequelize')

function logErrors(error, request, response, next) {
  console.log(error);
  next(error);
}

function errorSequelize(error, request, response, next) {
  if (error instanceof ValidationError) {
    response.status('409').json({
      statusCode: 409,
      field: error.fields,
      message: error.parent.detail,
    });
  }
  next(error);
}

function errorHandler(error, request, response, next) {
  response.status('500').json({
    message: error.message,
    stack: error.stack,
  });
}

function boomErrorHandler(error, request, response, next) {
  if (error.isBoom) {
    const { output } = error;
    response.status(output.statusCode).json({
      output: output.payload,
    });
  }

  next(error);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, errorSequelize };
