
const { validationResult } = require('express-validator');

const fielValidator = ( req, res, next ) => { // next es lo que hay que llamar si la funcion continua. Pasa al siguiente middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    
    next();
}

module.exports = {
    fielValidator
}