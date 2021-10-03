const express = require('express');
const morgan = require('morgan');
const pkg = require('../package.json')

//instancia Express
const app = express();
app.use(morgan('dev'));
app.use(express.json())

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