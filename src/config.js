const config = {
  server_port: process.env.PORT || 3000,
  db_host: "scooldb.cw94ufpberlr.us-east-2.rds.amazonaws.com",
  db_user: "admin",
  database: "scool",
  db_pass: "scool123",
  secret: "scool_secret"
}

module.exports = {config}; 