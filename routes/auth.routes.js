
const { Router } = require('express');
const { check } = require('express-validator');


const { fielValidator } = require('../middlewares/field-validator');
const { loginController } = require('../controllers/auth.controller');

const router = Router();

//En funcion del tipo de peticion que se haga (app.get/put/post/detelete) el endpoint sera distinto y traerá otro tipo de datos
router.post('/login',[
    check('email', "El email es obligatorio").isEmail(),
    check('pass', "La contraseña es obligatiora").not().isEmpty(),
    fielValidator
] , loginController);

module.exports = router;