# :notebook: Note Dashboard App :pencil:

[![Travis](https://img.shields.io/travis/rockchalkwushock/note_dashboard.svg?branch=master&style=flat-square)](https://travis-ci.org/rockchalkwushock/note_dashboard)
[![Codecov](https://img.shields.io/codecov/c/github/rockchalkwushock/note_dashboard.svg?style=flat-square)](https://codecov.io/gh/rockchalkwushock/note_dashboard)

[![API Docs](https://img.shields.io/badge/apidocs-hosted%20on%20surge-orange.svg?style=flat-square)](picayune-fold.surge.sh)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/rockchalkwushock/how-to-open-source/pulls)

[![bundled with webpack](https://img.shields.io/badge/bundled%20with-webpack-blue.svg?style=flat-square)](https://github.com/webpack/webpack)
[![nps](https://img.shields.io/badge/scripts%20run%20with-nps-blue.svg?style=flat-square)](https://github.com/kentcdodds/nps)
[![code style equimper](https://img.shields.io/badge/code%20style-equimper-blue.svg?style=flat-square)](https://github.com/EQuimper/eslint-config-equimper)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

React-Capstone: Help

:construction_worker: _WORK IN PROGRESS_ :construction_worker:

## Table of Contents

1. [FYI](#fyi)
1. [API Documentation](picayune-fold.surge.sh)
1. [Configurations](https://github.com/rockchalkwushock/note_dashboard/blob/master/docs/Configurations.md)
1. [License](#license)

## FYI

### Requirements

```plaintext
node@^7.9.0
npm@^4.5.0
yarn@^0.24.4
mongo@^3.4.4
```

You will need to have the `now` CLI installed globally to install your environment variables for deployment:

```sh
npm install -g now
# or
yarn global add now

now login
# follow instructions for logging in from CLI prompts
```

### Instructions

```sh
git clone https://github.com/rockchalkwushock/note_dashboard.git
cd note_dashboard
git checkout -b development # create a development branch locally.
git pull # pull the code base down from the remote development.
npm install || yarn install
cp .env.example .env # copy .env.example & rename copy to .env, now change to actual values for environment variables.

# Running in production:
npm run prod || yarn prod

# Running in development:
npm run dev || yarn dev

# Running only client code using Webpack-Dev-Server (development):
npm run start client.devServer || yarn start client.devServer

# Running only api server:
npm run start api.dev || yarn start api.dev
```

## License

[MIT](https://github.com/rockchalkwushock/note_dashboard/blob/master/LICENSE)
