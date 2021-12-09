const boom = require('@hapi/boom');
const config = require('../config/config');


function checkApiKey(req, res, next) {
  const apiKey = req.headers['api-key'];

  if (apiKey === config.apiKey) {
    next();
  }

  next(boom.unauthorized(`key is ${apiKey}`));
}

module.exports = checkApiKey;
