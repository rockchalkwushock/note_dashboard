import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import methodOverride from 'method-override';
import morgan from 'morgan';

import { userRoutes } from '../modules';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export default app => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors());
  app.use(methodOverride());
  // We don't need logging from morgan in Testing.
  if (isDev && !isTest) { app.use(morgan('dev')); }
  /**
   * API Routing
   * - /api/v1 - is the parent prefix
   * - /users  - is a child prefix that creates a user.
   * Adding routes is as simple as adding the fooRoutes
   * to the array object.
   */
  app.use('/api/v1', [userRoutes]);
}
