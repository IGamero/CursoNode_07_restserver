const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require("../models/user.model"); // Instancias del modelo


const jwtValidator = async (req = request, res = response, next) => {

    // Leer headers
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY); // ID del usuario con sesion

        // Leer usuario con este uid. Almacenarlo en la req.user
        const userOnSesion = await User.findById(uid);

        if(!userOnSesion) {
            return res.status(401).json({
                msg: "Token no valido - usuario no existe en DB"
            })
        }

        // Verificar que el usuario autenticado no esta eliminado
        if(!userOnSesion.status){
            return res.status(401).json({
                msg: "Token no valido - usuario con status: false"
            })
        }



        req.userOnSesion = userOnSesion; // Usuario con sesion iniciada
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "El token no es valido"
        })
    }



}

module.exports = {
    jwtValidator
}
