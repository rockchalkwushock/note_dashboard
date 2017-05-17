/**
 * Configure environment for API to execute in based on
 * NODE_ENV.
 * Default Configurations are always used.
 * Depending on NODE_ENV other configurations are added.
 */

const devConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: 'mongodb://localhost/notes-dashboard-development',
}

const prodConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,
}

const testConfig = {
  JWT_SECRET: 'ewtijwebgiuweg9w98u9283982t!!u1h28h1t1h89u9h@$$',
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
