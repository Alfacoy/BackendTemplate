import express from 'express';
import cors from 'cors';

import config from "../config.js";
import __dirname from "../utils.js";

export default class Server {
    constructor() {
        this.app = express();
        this.port = config.server.port;
        this.middlewares();
        this.routes();
    }

    middlewares = () => {
        this.app.use(express.static(`${__dirname}/public`));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes = () => {

    }

    listen = () => {
        this.app.listen(this.port, ()=> console.log(`Servidor escuchando el en puerto http://localhost:${this.port}`) );
    }

}
