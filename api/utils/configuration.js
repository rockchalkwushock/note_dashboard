require('dotenv-safe').load();
/**
 * Configure environment for API to execute in based on
 * NODE_ENV.
 * Default Configurations are always used.
 * Depending on NODE_ENV other configurations are added.
 */

const WHITELIST = {
  users: {
    signUp: ['email', 'password'],
  },
}

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: 'mongodb://localhost/notes-dashboard-development',
}

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
}

const testConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: 'mongodb://localhost/notes-dashboard-test',
}

const defaultConfig = {
  ENDPOINT: '/api/v1',
  SENTRY_DSN: process.env.SENTRY_DSN,
  PORT: process.env.PORT || 3000,
  WHITELIST,
}

/**
 * configureEnvironment(arg)
 *
 * @param {String} env - process.env.NODE_ENV
 * @returns {Object} config - config object based on current environment.
 */
const configureEnvironment = env => {
  switch (env) {
    case 'development': return devConfig;
    case 'test': return testConfig;
    default: return prodConfig;
  }
}

/**
 * Export our default environment configurations along
 * with whatever configurations are returned specifically
 * based on the current NODE_ENV of the server.
 */
export default {
  ...defaultConfig,
  ...configureEnvironment(process.env.NODE_ENV),
}
