const config = {
  server_port: process.env.PORT || 3000,
  pg_host: "scooldb.cw94ufpberlr.us-east-2.rds.amazonaws.com",
  pg_user: "postgres",
  pg_database: "scool",
  pg_pass: "scool123"
}

module.exports = config;