const app = require('./app');
const config = require('./config');
const pool = require('./db');

if(pool){
  console.log("PostgreSQL successfully connected");
}

app.listen(config.server_port, () => {
  console.log(`Server on port http://localhost:${config.server_port}`);
});