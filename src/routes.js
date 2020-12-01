import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import ConsultationController from './app/controllers/ConsultationController';
import ProcedureController from './app/controllers/ProcedureController';
import ToothController from './app/controllers/ToothController';
import UserController from './app/controllers/UserController';

import ClientValidator from './app/models/validators/ClientValidator';
import ToothValidator from './app/models/validators/ToothValidator'
import UserValidator from './app/models/validators/UserValidator';
import ErrorHandler from './app/models/validators/ErrorHandler';

const routes = Router();

routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.post('/clients', ClientValidator.validators, ErrorHandler.handler, ClientController.store);
routes.put('/clients/:id', ClientValidator.validators, ErrorHandler.handler, ClientController.update);
routes.delete('/clients/:id', ClientController.delete);

routes.get('/consultations', ConsultationController.index);
routes.get('/consultations/:id', ConsultationController.show);
routes.post('/consultations', ConsultationController.store);
routes.put('/consultations/:id', ConsultationController.update);
routes.delete('/consultations/:id', ConsultationController.delete);

routes.get('/procedures', ProcedureController.index);
routes.get('/procedures/:id', ProcedureController.show);
routes.post('/procedures', ProcedureController.store);
routes.put('/procedures/:id', ProcedureController.update);
routes.delete('/procedures/:id', ProcedureController.delete);

routes.get('/teeth', ToothController.index);
routes.get('/teeth/:id', ToothController.show);
routes.post('/teeth', ToothValidator.validators, ErrorHandler.handler, ToothController.store);
routes.put('/teeth/:id', ToothValidator.validators, ErrorHandler.handler, ToothController.update);
routes.delete('/teeth/:id', ToothController.delete);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserValidator.validators, ErrorHandler.handler, UserController.store);
routes.put('/users/:id', UserValidator.validators, ErrorHandler.handler, UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;