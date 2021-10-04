// const pool = require('../db/index');
const express = require('express');
const router = express.Router();

const { registroUsuario } = require('../controllers/users.controller')

router.post("/", registroUsuario)

module.exports = router;