/* eslint-disable no-console */

import mongoose from 'mongoose'

/**
 * database(arg)
 *
 * @param {String} conf Endpoint for Mongo to connect to.
 */
export default conf => {
  mongoose.Promise = global.Promise;
  mongoose.connect(conf);
  mongoose.connection
    .once('open', () => console.log(`Connected to MongoDB: ${conf}`))
    .on('error', e => { throw e; })
}
