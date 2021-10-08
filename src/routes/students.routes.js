const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const {completeInfo, getProfile} = require('../controllers/students.controller')

router.get("/get-profile", validarJWT, getProfile)
router.post("/complete-info", validarJWT ,completeInfo);

module.exports = router;