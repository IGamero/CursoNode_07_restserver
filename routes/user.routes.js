
const { Router } = require('express');
const { check } = require('express-validator');

// const { fielValidator } = require('../middlewares/field-validator');
// const { jwtValidator } = require('../middlewares/jwt-validator');
// const { isAdminRole, hasRole } = require('../middlewares/role-validator');

const {
    fielValidator,
    jwtValidator,
    isAdminRole,
    hasRole
} = require('../middlewares/index');

const { checkValidRole, checkExistEmail, checkExistUserByID } = require('../helpers/db-validators');

const {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
} = require('../controllers/users.controller');

const router = Router();

//En funcion del tipo de peticion que se haga (app.get/put/post/detelete) el endpoint sera distinto y traerá otro tipo de datos
router.get('/', getUser)

router.put('/:id', [
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(checkExistUserByID),
    check('role').custom(checkValidRole),
    fielValidator
], putUser) // /: se utilza para pasar argumentos de segmento tipo localhost:3000/usuarios/id/nombr/etc

router.post('/', [
    check('name', "El nombre es obligatorio").not().isEmpty(),
    check('pass', "La contraseña es obligatoria y debe tener mas de 6 caracteres").isLength({ min: 6 }),
    check('email', "El correo no es válido :(").isEmail(),
    check('email').custom(checkExistEmail),
    // check('role', "No es un rol permitido").isIn(['ADMIN_ROLE', 'USER_ROLE']),    
    check('role').custom(checkValidRole),
    // check('role').custom( (rol) => checkValidRole(rol)), // la llamada de la linea de arriba y esta son EXACTAMENTE lo mismo 
    fielValidator    //Validar los campos (email en este caso)
], postUser) // se pueden enviar middlewares en el segundo argumento

router.delete('/:id', [
    jwtValidator,
    // isAdminRole,
    hasRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTHER_ROLE'),
    check('id', 'El ID no es válido').isMongoId(),
    check('id').custom(checkExistUserByID),
    fielValidator
], deleteUser)

router.patch('/', patchUser)


module.exports = router;