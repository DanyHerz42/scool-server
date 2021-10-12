const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const {createClass, getClassesTeacher} = require('../controllers/classes.controller')


router.post("/create-class", validarJWT ,createClass);
router.get("/get-classes-by-teacherid", validarJWT, getClassesTeacher)

module.exports = router;