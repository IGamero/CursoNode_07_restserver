const express = require('express');
const cors = require('cors');   // permite un controll de acceso.
const { dbConnection } = require('../database/config.db');
// puedes listar quien puede entrar y quien no.


class Server {

    constructor() {
        this.app = express(); // creamos el servidor con el constructor de server
        this.port = process.env.PORT;
        this.usersPath   = '/API/users';
        this.authPath    = '/API/auth';

        // Conectar a la Base de Datos
        this.conectarDB()

        // Middlewares (funciones que se van a ejecutar SIEMPRE que se inicie el servidor)
        // se usan con .use()
        this.middlewares();

        // Rutas de la app
        this.routes()
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json()); // intentara transformar a JSON todos los objetos recibidos

        // Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        // endpoint
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.usersPath, require('../routes/user.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;