const { request, response } = require('express')


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

const postUser = (req = request, res = response) => {

    const { name, age } = req.body; // esto es lo que nos envia el usuario desde front

    res.json({
        // code: 1,
        msg: "post API - postUser",
        name,
        age
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