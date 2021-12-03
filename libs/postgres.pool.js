const { Pool } = require('pg');
const config = require('../config/config');

let URI = '';

if (config.isProd) {
  URI = config.dbURL;
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

let options = {
  connectionString: URI,
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false
  };

}

const pool = new Pool(options);


module.exports = pool;
