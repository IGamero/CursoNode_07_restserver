const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require("../models/user"); // Instancias del modelo


const getUser = (req = request, res = response) => {
    //{ valores por defecto }
    const { q = 'No Data', name = 'No Data', token = 'No Data', page = 1, limit = 10 } = req.query;

    res.json({
        // code: 1,
        msg: "get API - getUser",
        q,
        name,
        token,
        page,
        limit
    });
}

const postUser = async (req = request, res = response) => {

    const { name, email, pass, role } = req.body; // esto es lo que nos envia el usuario desde front
    const user = new User({ name, email, pass, role });

    // Verificar si el correo existe (Validaciones)
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        // Ya existe ese correo
        return res.status(400).json({
            msg: "Este correo ya está registrado :("
        });
    }

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(); // complicacion de la emprictacion. Vueltas/veces que se encripta. Default = 10
    user.pass = bcryptjs.hashSync(pass, salt) // Encriptacion de una via. Yo no puedo saber deninguna forma la pass

    // Guardar en DB
    await user.save(); // guarda en la DB

    res.json({
        // code: 1,
        // msg: "post API - postUser",
        user
    });
}

const putUser = (req = request, res = response) => {

    const { id } = req.params

    res.json({
        // code: 1,
        msg: "put API - putUser",
        id
    });
}

const patchUser = (req = request, res = response) => {

    res.json({
        // code: 1,
        msg: "patch API - patchUser"
    });
}

const deleteUser = (req = request, res = response) => {

    res.json({
        // code: 1,
        msg: "delete API - deleteUser"
    });
}


module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}