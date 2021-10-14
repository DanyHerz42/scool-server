const express = require('express');
const morgan = require('morgan');
const pkg = require('../package.json')
const cors = require('cors')
const path = require('path')

//instancia Express
const app = express();

//configuracion de express
app.use(morgan('dev'));
app.use(express.json())
app.use(cors());
app.options("*", cors());

//importacion y configuracion de rutas
const userRoutes = require('./routes/users.routes')
const classesRoutes = require('./routes/classes.routes')
const teachersRoutes = require('./routes/teachers.routes');
const studentsRoutes = require('./routes/students.routes');
const organizationsRoutes = require('./routes/organizations.routes');
const homeworksRoutes = require('./routes/homeworks.routes')

app.use("/users", userRoutes);
app.use("/classes", classesRoutes);
app.use("/teachers", teachersRoutes);
app.use("/students", studentsRoutes);
app.use("/organizations", organizationsRoutes);
app.use("/homeworks", homeworksRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

//Ruta inicial
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