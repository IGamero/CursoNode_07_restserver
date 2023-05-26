const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require("../models/user.model"); // Instancias del modelo


const getUser = async (req = request, res = response) => {
    //{ valores por defecto }
    // const { q = 'No Data', name = 'No Data', token = 'No Data', page = 1, limit = 10 } = req.query;

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true } // Status devuelve usuarios activos

    // Lo ejecutamos a continuación de manera simultanea
    // const users = await User.find(query) // En el objeto se pasan las condiciones
    //     .skip(Number(from))
    //     .limit(Number(limit));

    // const total = await User.countDocuments(query);

    const [users, total] = await Promise.all([ // desestructuración de array / Promise.All ejecuta todas las promseas (await) al mismo tiempo  
        User.find(query) // En el objeto se pasan las condiciones
            .skip(Number(from))
            .limit(Number(limit)),

        User.countDocuments(query)
        // Si una promesa falla, fallan todas

    ])

    res.json({
        // code: 1,
        // msg: "get API - getUser",
        // answer
        total,
        users
    });
}

const postUser = async (req = request, res = response) => {

    const { name, email, pass, role } = req.body; // esto es lo que nos envia el usuario desde front
    const user = new User({ name, email, pass, role });

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

const putUser = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, pass, google, email, ...otherElem } = req.body;

    //TODO validar contra base de datos
    // Si trae contraseña es porque el usuaro quiere cambiarla
    if (pass) {
        const salt = bcryptjs.genSaltSync();
        otherElem.pass = bcryptjs.hashSync(pass, salt);
    }

    const user = await User.findByIdAndUpdate(id, otherElem)

    res.json({
        // code: 1,
        // msg: "put API - putUser",
        user
    });
}

const patchUser = (req = request, res = response) => {

    res.json({
        // code: 1,
        msg: "patch API - patchUser"
    });
}

const deleteUser = async (req = request, res = response) => {

    const { id } = req.params;

    // Eliminar registro de la BD
    // const user = await User.findByIdAndDelete(id);

    // Marcar usuario como eliminado
    const user = await User.findByIdAndUpdate(id, { status: false })

    res.json({
        // code: 1,
        msg: "delete API - deleteUser",
        user,
        id
    });
}


module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}