

// Este es el tipo de dato que se va a guardar

// {
//     name: 'asfd',
//     email: 'asdfsd@dfasdf.com',
//     pass:'sadfsadfsa',
//     img: 'asdfsdafsad',
//     role: 'admin',
//     status: true/false,
//     google: true/false (cuenta google?)
// }

const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, pass, _id, ...user } = this.toObject();  // el operador ... indica el resto de elementos
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);
