# Repository Configurations

## Table of Contents

1. [Babel](#babel)
1. [Build](#build)
1. [CI](#travis)
1. [Commitizen](#commitizen)
1. [EnvVars](#envvars)
1. [Eslint](#eslint)
1. [Husky](#husky)
1. [Jest](#jest)
1. [Lint-Staged](#lint-staged)
1. [Prettier](#prettier)
1. [Scripting](#scripting)


### Babel

Babel is what is going to make our code run in the DOM/Browser by transpiling our ES6 & beyond code into ES5 or CommonJS (cjs) which is what the DOM/Browser understands.

Since we will be using ES7 syntax as well we will be using the `stage-0` preset other than that `react` covers all jsx related code & `env` provides `es2015` as well as some extra bells & whistles under the hood for targeting specific environments.

We will use the `babel-cli` to target `BABEL_ENV` so that is why there are separate _environments_ when it comes to the `.babelrc`.

- API Configuration

```json
{
  "env": {
    "development": {
      "presets": [
        ["env", { "targets": { "node": "current" }}],
        "stage-0"
      ]
    },
    "production": {
      "presets": [
        ["env", { "targets": { "node": "current" }}],
        "stage-0"
      ]
    },
    "test": {
      "presets": ["env", "stage-0"]
    }
  }
}
```

- Client Configuration

```json
{
  "env": {
    "development": {
      "presets": [
        ["env", { "modules": false }],
        "react",
        "stage-0"
      ]
    },
    "production": {
      "presets": [
        ["env", { "modules": false }],
        "react",
        "stage-0"
      ]
    },
    "test": {
      "presets": ["env", "react" ,"stage-0"]
    }
  }
}
```

### Build

The build for the repository is being handled by `webpack` & specifically we are using `webpack@^2`. There are two configs: one for development which has the `webpack-dev-serer` code in it & another for compiling the code base in production.

### Travis

If you choose to perform testing & use continuous integration, _I highly encourage this_ the `.travis.yml` is setup for immediate use & will distribute coverage data to `CodeCov` for coverage reporting.

The `yarn start` script **MUST** be used when initializing commands in the `.travis.yml`. Travis does not recognize the `nps` command.

- example

```yml
# after_success
  - yarn start reportCoverage
```

### Commitizen

The `commitizen-cli` has been installed in the project for generating cleaner commit messages to use it simply:

```sh
yarn commit
# instead of
git commit
```

### EnvVars

Your environment variables are being managed by `dotenv-save`. This package requires the `.env.example` file be present that is why in the instructions section of the README I say to use:

```sh
cp .env.example .env
# and not
mv .env.example
```

If the `.env.example` is not present `dotenv-safe` will scream at you! It reads from this file initially and then scans your `.env` file to make sure _all_ the declared env vars are present and that they have values assigned to them.

### Eslint

The linting for the repository is set up to work hand in hand with `prettier`. By running:

```sh
yarn start lint
# or
yarn start lint.fix
```

The code base will be linted & in the case of that second command any _fixable_ errors will be automatically fixed by `eslint`.

### Husky

`husky` just manages the running of the _git hooks_ in the repository such as _precommit_. When you run `yarn commit`, `husky` will register this and run `precommit` before executing the `commit` script.

### Jest

The repository is initialized to use the `jest` test suite. `__tests__/` are setup in both `./api` & `./src`. The coverage is set at 70% across the repository but can be adjusted as you feel the need.

```sh
# scripts
yarn test
yarn start test.coverage
yarn start test.watch
```

### Lint-Staged

`lint-staged` will execute the `prettier` script prior to committing code. The `prettier` script will scan the designated code cleaning & formating it, then it will `git add` any changed back to the stage for committing.

### Prettier

`prettier` is there to make your life easier in formatting your code automatically to what you prescribe in the options of the script.

### Scripting

`nps` is pretty much **AMAZE BALLS** for the simple fact you can now easily go read what each script is doing based on it's description key. Since this is a `js` file we can build out objects that represent our scripts giving the descriptions and even nesting commands.

`nps` also has a utils package that provides us with all the normal packages we would use for writing our scripts such as `cross-env` & `rimraf`. Whenever we need to write a script that runs multiple scripts we can designate if the scripts should run in _series_ or _concurrently_.

In the below example you can see if we just run the `yarn test` script we will be running the **default** script. In the event we want to generate coverage or watch the repository while testing we can run the _keys_ on the `test` object:


> ***NOTE:***
>
> **ALL** scripts must be prefixed with the `nps` command that are built using `nps`. This is why the `yarn start` script exists for running other nps scripts.

```sh
yarn start test.coverage
yarn start test.watch
```

- example

```js
{
  ...
test: {
      description: 'Run Jest test suite on code base.',
      default: 'jest --config jest.config.json',
      coverage: {
        description: 'Generate coverage data.',
        script: series.nps('test --coverage'),
      },
      watch: {
        description: 'Watch test suite.',
        script: series.nps('test --watch'),
      },
    },
    ...
}

```
