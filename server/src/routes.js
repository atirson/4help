import { Router } from 'express';

import VoluntaryController from './app/controllers/VoluntaryController';
import CompanyController from './app/controllers/CompanyController';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Welcome to Omni CLI' }));

routes.post('/voluntary', VoluntaryController.store);
routes.get('/voluntary', VoluntaryController.index);
routes.put('/voluntary', VoluntaryController.update);
routes.delete('/voluntary', VoluntaryController.delete);

routes.post('/company', CompanyController.store);
routes.get('/company', CompanyController.index);
routes.put('/company', CompanyController.update);
routes.delete('/company', CompanyController.delete);

export default routes;
