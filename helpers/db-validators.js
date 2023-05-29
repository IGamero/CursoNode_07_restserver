const Role = require('../models/role.model');
const User = require("../models/user.model"); // Instancias del modelo


const checkValidRole = async (role = '') => {
    const existRol = await Role.findOne({ role })
    if (!existRol) {
        throw new Error(`El rol '${role}' no es correcto`);
    }
}

// Verificar si el correo existe (Validaciones)
const checkExistEmail = async (email = '') => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`El email '${email}' ya esta registrado`);
    }
}

// Verificar si el id existe (Validaciones)
const checkExistUserByID = async (id) => {
    const userByID = await User.findById(id);
    if (!userByID) {
        throw new Error(`No existe usuario con id '${id}'`);
    }
}


module.exports = {
    checkValidRole,
    checkExistEmail,
    checkExistUserByID
}
