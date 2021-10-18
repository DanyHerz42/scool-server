const express = require('express');
const { deliveryHomework } = require('../controllers/deliverys.controller');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');



router.post("/delivery-homework", validarJWT, deliveryHomework);