const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const { generateJWT } = require('../helpers/generateJWT');


const loginController = async (req, res = response) => {

    const { email, pass } = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Pass no son correctos - correo'
            })
        }

        // Verificar si el usuario esta activo
        if (!user.status) {
            return res.status(400).json({
                msg: 'Usuario / Pass no son correctos - status:false'
            })
        }

        // Verificar pass
        const validPass = bcryptjs.compareSync(pass, user.pass);

        if (!validPass) {
            return res.status(400).json({
                msg: 'Usuario / Pass no son correctos - pass',
                validPass
            })

        }

        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })  


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo ha salido mal :('
        })
    }

}

module.exports = {
    loginController
}