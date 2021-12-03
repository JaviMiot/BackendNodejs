const { Sequelize } = require('sequelize');

const config = require('../config/config');
const setupModels = require('./../db/models');

let URI = '';
let options = {
  dialect: 'postgres',
  logging: config.isProd ? msg => console.log(msg) : false,
};


if (config.isProd) {
  URI = config.dbURL;

  options = {
    ssl: {
      rejectUnauthorized: false
    }
  };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const sequalize = new Sequelize(URI, options);

setupModels(sequalize);

module.exports = sequalize;
