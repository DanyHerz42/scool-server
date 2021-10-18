const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const {completeInfo, getProfile, registerInClass, getClasses, getPendings, getAllHomeworks} = require('../controllers/students.controller')

router.get("/get-profile", validarJWT, getProfile);
router.post("/complete-info", validarJWT, completeInfo);
router.post("/register-in-class", validarJWT, registerInClass); 
router.get("/get-student-classes", validarJWT, getClasses);
router.get("/get-pendings", validarJWT, getPendings);
router.get("/get-all-homeworks", validarJWT, getAllHomeworks);

module.exports = router;