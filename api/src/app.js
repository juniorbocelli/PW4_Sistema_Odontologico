import express from 'express';
import routes from './routes';
import cors from 'cors';
import './database';

import passport from 'passport';
import session from 'express-session';
import sessionConfig from './config/session';

import passportConfig from './auth/auth'
import protectPageMiddleware from './auth/protectPageMiddleware'

//Criamos uma classe para trabalhar com apenas uma instancia do server
class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.configPassport();
        this.routes();
    }

    // Onde será configurado nossas rotas
    routes() {
        this.server.use(routes);
    }

    // Se ocorrerá algum tipo de middleware na aplicação
    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());

        // Middlewares de autenticação
        this.server.use(session(sessionConfig));
        this.server.use(passport.initialize());
        this.server.use(passport.session());

        /**
         * Para testar rotas sem precisar de sessão de login, comente este bloco abaixo.
         */
        //Páginas protegidas
        // this.server.all('/', protectPageMiddleware);
        // this.server.use('/api/clients', protectPageMiddleware);
        // this.server.use('/api/consultations', protectPageMiddleware);
        // this.server.use('/api/procedures', protectPageMiddleware);
        // this.server.use('/api/teeth', protectPageMiddleware);
        // this.server.use('/api/users', protectPageMiddleware);
    }

    configPassport() {
        // Passando a instância do passport para o arquivo de configuração
        passportConfig(passport);
    }
}

export default new App().server;