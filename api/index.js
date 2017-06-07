/* eslint-disable no-console */

import Express from 'express'
import http from 'http'

import { database, config, middlewares } from './configs'

// Create instance of Express.
const app = new Express()
// Create HTTP server.
const server = http.createServer(app)
const MODE = process.env.NODE_ENV

// Connect to the environment determined database.
database(config.MONGO_URI)

// Apply middlewares to Express.
middlewares(app)

// Open HTTP/Express server on specified Port.
server.listen(config.PORT, err => {
  /* istanbul ignore if  */
  if (err) {
    return console.error(err)
  }
  console.log(`App running on port: ${config.PORT} in ${MODE} mode.`)
})

// Export the server object for mocking in our test suite.
export default server
