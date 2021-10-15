const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const {createClass, getClassesTeacher, getWorkflow} = require('../controllers/classes.controller')


router.post("/create-class", validarJWT ,createClass);
router.get("/get-classes-by-teacherid", validarJWT, getClassesTeacher)
router.get("/get-workflow/:id_class", validarJWT, getWorkflow)

module.exports = router;