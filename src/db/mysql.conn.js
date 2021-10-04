var mysql = require("mysql");
const util = require('util');
const {config} = require('../config');

var connection = mysql.createConnection({
  host: config.db_host,
  user: config.db_user,
  password: config.db_pass,
  database: config.database,
});
connection.connect(function (err) {
  if (err) console.log(err);;
  console.log("Base conectada");
});

// const query = util.promisify(connection.query).bind(connection)
const query = util.promisify(connection.query).bind(connection);

module.exports = query;
