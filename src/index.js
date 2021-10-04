const app = require('./app');
const {config} = require('./config');


app.listen(config.server_port, () => {
  console.log(`Server on port http://localhost:${config.server_port}`);
});