/* eslint-disable no-console */

import express from 'express';
import {
  database,
  config,
  middlewares,
} from './utils';

// Create instance of Express.
const app = express();
const MODE = process.env.NODE_ENV;

// Apply middlewares to Express.
middlewares(app);
// Connect to the environment determined database.
database(config.MONGO_URI)

app.listen(config.PORT, err => {
  if (err) { return console.error(err); }
  console.log(`App running on port: ${config.PORT} in ${MODE} mode.`);
});
