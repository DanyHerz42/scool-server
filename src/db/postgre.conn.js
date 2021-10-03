const {Pool} = require('pg');
const config = require('../config');

const config_db = {
  user: config.pg_user,
  host: config.pg_host,
  password: config.pg_pass,
  database: config.pg_database
}

const pool = new Pool(config_db);

module.exports = pool;
