const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const { getOrgs } = require('../controllers/organizations.controller')


router.get("/" ,getOrgs);

module.exports = router;