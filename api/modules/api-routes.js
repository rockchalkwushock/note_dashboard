import { Router } from 'express';
import HTTPStatus from 'http-status';

// Import all routes for the API here.
import { userRoutes } from './user';

// Middlewares
import { APIError, logErrorService } from '../services';

const routes = new Router();

// Create sub-routes for specific modules.
routes.use('/users', userRoutes);

// Handle the case of all routes NOT defined.
routes.get('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);

// Apply the middleware to all routes.
routes.use(logErrorService);

export default routes;
