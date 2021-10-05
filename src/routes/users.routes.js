// const pool = require('../db/index');
const express = require('express');
const router = express.Router();

const { registroUsuario, login } = require('../controllers/users.controller')

router.post("/", registroUsuario);
router.post("/login", login);

module.exports = router;