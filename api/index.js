/* eslint-disable no-console */

import express from 'express';
import { middlewares } from './utils';

const app = express();

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;

middlewares(app);

app.listen(PORT, err => {
  if (err) { return console.error(err); }
  console.log(`App running on port: ${PORT} in ${MODE} mode.`);
});
