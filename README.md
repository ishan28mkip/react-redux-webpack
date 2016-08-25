* This boilerplate is inspired from configuration given on http://survivejs.com/

## Getting Started

1. `npm i` - Install dependencies. This might take a while.
2. `npm start` - Run development build. If it doesn't start, make sure you aren't running anything else in the same port. In case you are on a Unix platform, you can try `PORT=3000 npm start`. It will pick up the port from the environment if it's set.
3. Surf to the port shown at terminal.
4. Start modifying the code. The browser should pick up the changes.

## Advanced Commands

Beyond development, the boilerplate supports other tasks listed below:

* `npm run build` - Generates a production build below `build/`.
* `npm run deploy` - Deploys the contents of the `build/` directory below the **gh-pages** branch.
* `npm run test` - Runs `tests/` through Karma/Phantom/Mocha once.
* `npm run test:tdd` - Runs `tests/` in a TDD mode (watches for changes and rebuilds).
* `npm run test:lint` - Runs code through ESLint to spot code quality issues.
* `npm run stats` - Generates Webpack build statistics.

## Instructions to use the boilerplate:
Tests:
* Every Directory contains a \_\_test\_\_ folder with the tests for that directory.
* The tests are to be named [filename]-test.jsx where filename is the file to be tested.
* ##To be completed##
