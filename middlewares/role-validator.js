const { response } = require("express")


const isAdminRole = (req, res = response, next) => {

    if (!req.userOnSesion) {
        return res.status(500).json({
            msg: "Error al verificar rol de un usuario logueado - token invalido"
        })
    }
    const { role, name } = req.userOnSesion;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${name} no es administrador - No puede hacer esto`
        })
    }
    next();
}

const hasRole = (...roles) => {
    return ((req, res = response, next) => {

        if (!req.userOnSesion) {
            return res.status(500).json({
                msg: "Error al verificar rol de un usuario logueado - token invalido"
            })
        }

        if (!roles.includes(req.userOnSesion.role)) {
            res.status(401).json({
                msg: `Es necesario uno de lo siguientes roles ${roles}`
            })
        }

        next();
    })
}

module.exports = {
    isAdminRole,
    hasRole
}
