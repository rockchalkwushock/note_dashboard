import { Router } from 'express';
import validate from 'express-validation';

import {
  allNotes,
  createNote,
  deleteNote,
  editNote,
  noteById,
} from './controller';
import valid from './validation';
import { authJwt } from '../../services';

const routes = new Router();

/**
 * All these routes are prefixed by: /notes
 *
 * 1. Define the route.
 * 2. These are auth protected routes so check for JWT.
 * 3. Validate the data being provided on POST against
 *    the Joi validation object.
 * 4. Provide the data to the controller method.
 */
routes.post('/', authJwt, validate(valid.createNote), createNote);
routes.patch('/:id', authJwt, validate(valid.editNote), editNote);
routes.delete('/:id', authJwt, deleteNote);
routes.get('/:id', authJwt, noteById);
routes.get('/', authJwt, allNotes);

export default routes;
