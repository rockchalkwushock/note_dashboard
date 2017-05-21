import { Router } from 'express';
import validate from 'express-validation';

import { signIn, signUp } from './controller';
import valid from './validation';
import { authLocal } from '../../services';

const routes = new Router();

/**
 * All these routes are prefixed by: /users
 *
 * 1. Define the route.
 * 2. Validate the data being provided on POST
 *    against Joi validation object.
 * 3. If auth protected route add auth layer to route.
 * 4. Provide data to controller method.
 */
routes.post('/sign-in', validate(valid.signIn), authLocal, signIn);
routes.post('/sign-up', validate(valid.signUp), signUp);

export default routes;
