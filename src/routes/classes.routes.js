const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const {createClass} = require('../controllers/classes.controller')


router.post("/create-class", validarJWT ,createClass);

module.exports = router;