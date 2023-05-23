

const { Router } = require('express')

const {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
} = require('../controllers/users.controller')

const router = Router();

//En funcion del tipo de peticion qu se haga (app.get/put/post/detelete) el endpoint sera distinto y traerá otro tipo de datos
router.get('/', getUser)
router.put('/:id', putUser) // /: se utilza para pasar argumentos de segmento tipo localhost:3000/usuarios/id/nombr/etc
router.post('/', postUser)
router.delete('/', deleteUser)
router.patch('/', patchUser)


module.exports = router;