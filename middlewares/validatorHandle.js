const boom = require('@hapi/boom');
/*
 ? Se pasa el schema y property para que sea de forma dinamica
 */

function validatorHandle(schema, property) {
  return (request, response, next) => {
    const data = request[property];
    const { error } = schema.validate(data, {abortEarly: false});

    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandle;
