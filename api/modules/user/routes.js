import { Router } from 'express';
import validate from 'express-validation';

import { signUp } from './controller';
import valid from './validation'

const routes = new Router();

/**
 * 1. Define the route: 'user/signup'.
 * 2. Validate the data being provided on the POST
 *    against valid.signUp object.
 * 3. Provide data to signUp controller method for
 *    creating a user in the database.
 */
routes.post('/user/sign-up', validate(valid.signUp), signUp);

export default routes;
