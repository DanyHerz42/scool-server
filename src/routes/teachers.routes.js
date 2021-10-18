const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const {completeInfo, getProfile} = require('../controllers/teachers.controller')


router.post("/complete-info", validarJWT ,completeInfo);
router.get("/get-profile", validarJWT, getProfile);

module.exports = router;