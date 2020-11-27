import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import ClientController from './app/controllers/ClientController';
import ConsultationController from './app/controllers/ConsultationController';
import ProcedureController from './app/controllers/ProcedureController';
import ToothController from './app/controllers/ToothController';
import UserController from './app/controllers/UserController';

import UserValidator from './app/models/validators/UserValidator';

const routes = Router();

routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
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
routes.post('/teeth', ToothController.store);
routes.put('/teeth/:id', ToothController.update);
routes.delete('/teeth/:id', ToothController.delete);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserValidator.getValidators, UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;