const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('body-parser');
const { use } = require('../routes/auth.routes');


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

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email })



        if (!user) {
            // Crear usuario
            const data = {
                name,
                email,
                pass: 'googleUserDefaultPass',
                img,
                isGoogleUser: true
            };

            user = new User(data)

            console.log(user)
            await user.save();
        }

        // Si el usuario de DB tiene estado false no puede grabarse
        if (!user.status) {
            return res.status(401).json({
                msg: "Contacte con el administrador - Usuario bloqueado"
            })
        }

        // Generar JWT
        const token = await generateJWT(user.id);


        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 0,
            msg: 'El token no se ha podido verficar'
        })
    }



}

module.exports = {
    loginController,
    googleSignIn
}