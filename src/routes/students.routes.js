const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const {completeInfo} = require('../controllers/students.controller')


router.post("/complete-info", validarJWT ,completeInfo);

module.exports = router;