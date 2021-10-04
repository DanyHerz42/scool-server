const express = require('express');
const morgan = require('morgan');
const pkg = require('../package.json')
const cors = require('cors')

//instancia Express
const app = express();

//configuracion de express
app.use(morgan('dev'));
app.use(express.json())
app.use(cors());
app.options("*", cors());

//importacion de rutas
const userRoutes = require('./routes/users.routes')

app.use("/users", userRoutes);

app.set("pkg", pkg)

app.get('/', (req, res) => {
    res.json({
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        name: app.get('pkg').name,
        version: app.get('pkg').version
    })
})

module.exports = app;