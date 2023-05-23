require('dotenv').config();
const Server = require('./models/server')


const server = new Server(); // se inicia todo lo que hay en la clase Server
server.listen();

