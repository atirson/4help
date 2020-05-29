import { Router } from 'express';

import VoluntaryController from './app/controllers/VoluntaryController';
import VoluntaryBO from './app/service/VoluntaryBO';
import CompanyController from './app/controllers/CompanyController';
import CompanyBO from './app/service/CompanyBO';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to 4Help' }));

routes.post('/voluntary', VoluntaryBO.validateStore, VoluntaryController.store);
routes.put(
  '/voluntary',
  VoluntaryBO.validateUpdate,
  VoluntaryController.update
);
routes.get('/voluntary', VoluntaryController.index);
routes.delete('/voluntary', VoluntaryController.delete);

routes.post('/company', CompanyBO.validateStore, CompanyController.store);
routes.put('/company', CompanyBO.validateUpdate, CompanyController.update);
routes.get('/company', CompanyController.index);
routes.delete('/company', CompanyController.delete);

export default routes;
