import { Router } from 'express';
import passport from 'passport';

import ClientController from './app/controllers/ClientController';
import ConsultationController from './app/controllers/ConsultationController';
import ProcedureController from './app/controllers/ProcedureController';
import ToothController from './app/controllers/ToothController';
import UserController from './app/controllers/UserController';

import ClientValidator from './app/models/validators/ClientValidator';
import ConsultationValidator from './app/models/validators/ConsultationValidator';
import ProcedureValidator from './app/models/validators/ProcedureValidator';
import ToothValidator from './app/models/validators/ToothValidator'
import UserValidator from './app/models/validators/UserValidator';
import ErrorHandler from './app/models/validators/ErrorHandler';

const routes = Router();

// Acessa a página de login
routes.get('/login', (req, res, next) => {
    if (req.query.fail)
        return res.json({ message: 'Usuário e/ou senha incorretos!' });
    else
        return res.json({ message: null });
});
 
// API que recebe os dados de login para validar ou não um usuário
routes.post('/api/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.json({error: "Problemas na autentificação!"}); }
      if (!user) { return res.json({error: "Login inválido!"}); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        let myUser = req.user;
        return res.json(myUser);
      });
    })(req, res, next);
  });

routes.get('/api/clients', ClientController.index);
routes.get('/api/clients/:id', ClientController.show);
routes.post('/api/clients', ClientValidator.validators, ErrorHandler.handler, ClientController.store);
routes.put('/api/clients/:id', ClientValidator.validators, ErrorHandler.handler, ClientController.update);
routes.delete('/api/clients/:id', ClientController.delete);
// Validação de e-mail
routes.get('/clients/mail-validate/:id', ClientController.mailValidate);

routes.get('/api/consultations', ConsultationController.index);
routes.get('/api/consultations/:id', ConsultationController.show);
routes.post('/api/consultations', ConsultationValidator.validators, ErrorHandler.handler, ConsultationController.store);
routes.put('/api/consultations/:id', ConsultationValidator.validators, ErrorHandler.handler, ConsultationController.update);
routes.delete('/api/consultations/:id', ConsultationController.delete);
// Confirmação de consulta
routes.get('/consultations/confirm-consultation/:id', ConsultationController.confirmConsultation);
// Consultas do dia
routes.post('/api/consultations/day', ConsultationController.getByday);

routes.get('/api/procedures', ProcedureController.index);
routes.get('/api/procedures/:id', ProcedureController.show);
routes.post('/api/procedures', ProcedureValidator.validators, ErrorHandler.handler, ProcedureController.store);
routes.put('/api/procedures/:id', ProcedureValidator.validators, ErrorHandler.handler, ProcedureController.update);
routes.delete('/api/procedures/:id', ProcedureController.delete);

routes.get('/api/teeth', ToothController.index);
routes.get('/api/teeth/:code', ToothController.show);
routes.post('/api/teeth', ToothValidator.validators, ErrorHandler.handler, ToothController.store);
routes.put('/api/teeth/:code', ToothValidator.validators, ErrorHandler.handler, ToothController.update);
routes.delete('/api/teeth/:code', ToothController.delete);

routes.get('/api/users', UserController.index);
routes.get('/api/users/:id', UserController.show);
routes.post('/users', new UserValidator('create').validators, ErrorHandler.handler, UserController.store);
routes.put('/api/users/:id',new UserValidator('update').validators, ErrorHandler.handler, UserController.update);
routes.delete('/api/users/:id', UserController.delete);

export default routes;