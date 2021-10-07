const jwt = require('jsonwebtoken');
const { config } = require('../config');

const validarJWT = (req, res, next) => {

    const token = req.header('token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la petición'
        })
    }

    try {

        const { userFound } = jwt.verify(
            token,
            config.secret
        )
        req.userFound = userFound;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no válido'
        })
    }
    next();
}

module.exports = {
    validarJWT
}