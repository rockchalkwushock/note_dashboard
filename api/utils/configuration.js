/**
 * Configure environment for API to execute in based on
 * NODE_ENV.
 * Default Configurations are always used.
 * Depending on NODE_ENV other configurations are added.
 */


const devConfig = {
  MONGO_URI: 'mongodb://localhost/notes-dashboard-development',
}

const prodConfig = {
  MONGO_URI: process.env.MONGO_URI
}

const testConfig = {
  MONGO_URI: 'mongodb://localhost/notes-dashboard-test',
}

const defaultConfig = {
  PORT: process.env.PORT || 3000,
}

/**
 * configureEnvironment(arg)
 *
 * @param {String} env
 */
const configureEnvironment = env => {
  switch (env) {
    case 'development': return devConfig;
    case 'test': return testConfig;
    default: return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...configureEnvironment(process.env.NODE_ENV),
}
