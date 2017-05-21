const npsUtils = require('nps-utils');

const {
  rimraf,
  crossEnv,
  series,
  concurrent
} = npsUtils;

module.exports = {
  scripts: {
    api: {
      description: 'Run the API Server in production environment.',
      default: `${crossEnv('NODE_ENV=production')} nodemon index.js`,
      dev: {
        description: 'Run the API Server in development environment.',
        script: `${crossEnv('NODE_ENV=development')} nodemon index.js`,
      },
    },
    client: {
      description: 'Build the client code base in production environment with Webpack.',
      default: `${crossEnv('BABEL_ENV=production NODE_ENV=production')} webpack -p --progress --profile --colors --config webpack.config.prod.js`,
      devServer: {
        description: 'Build & Run the client code base with Webpack-Dev-Server.',
        script: `${crossEnv('BABEL_ENV=development NODE_ENV=development')} webpack-dev-server --colors --profile --config webpack.config.dev.js`,
      },
    },
    clean: {
      description: 'Clean repository of generated directories & files.',
      script: series(rimraf('build'), rimraf('coverage'), rimraf('doc'))
    },
    commit: {
      description: 'Run commitizen-cli for creating clean commit messages.',
      script: 'git cz',
    },
    deploy: {
      description: 'Deploying instance to Zeit Servers.',
      script: 'now -e MONGODB=@mongodb',
    },
    docs: {
      description: 'Documenting the API.',
      default: 'apidoc -i api',
      deploy: {
        description: 'Deploying the documentation on surge.',
        script: series.nps('docs', `surge ./doc -d ${process.env.DOCS_WEBSITE}`),
      },
    },
    lint: {
      description: 'Lint code base.',
      default: 'eslint api src',
      fix: {
        description: 'Lint & fix errors.',
        script: series.nps('lint --fix'),
      },
    },
    reportCoverage: {
      description: 'Send coverage data to third party.',
      script: 'codecov',
    },
    start: {
      description: 'Execute repository code in production environment.',
      default: series.nps('client', 'api'),
      dev: {
        description: 'Execute repository code in development environment',
        script: concurrent.nps('api.dev', 'client.devServer'),
      },
    },
    test: {
      description: 'Run Jest test suite on code base.',
      default: 'jest --config jest.config.json --runInBand',
      coverage: {
        description: 'Generate coverage data.',
        script: series.nps('test --coverage --silent'),
      },
      watch: {
        description: 'Watch test suite.',
        script: series.nps('test --watch'),
      },
    },
    validate: {
      description: 'Validate code base against linting & tests.',
      default: concurrent.nps('lint', 'test'),
      withCoverage: {
        description: 'Validate code & output coverage data.',
        script: concurrent.nps('lint', 'test.coverage'),
      }
    }
  }
}
