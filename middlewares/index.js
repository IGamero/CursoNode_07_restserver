

const fielValidator = require('../middlewares/field-validator');
const jwtValidator = require('../middlewares/jwt-validator');
const roleValidator = require('../middlewares/role-validator');

module.exports = {
    ...fielValidator,
    ...jwtValidator,
    ...roleValidator
}