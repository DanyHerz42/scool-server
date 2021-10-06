// const pool = require('../db/index');
const express = require('express');
const router = express.Router();

const { registroUsuario, login, revalidarToken } = require('../controllers/users.controller');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post("/", registroUsuario);
router.post("/login", login);
router.get("/renew", validarJWT, revalidarToken)

module.exports = router;