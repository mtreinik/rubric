# Rubric

A tool for creating interactive assessment rubrics.

# Assessment rubrics

A rubric is a set of criteria used to evaluate students' responses.

This tool allows teachers to create rubrics and fill them out.

Here the emphasis is not on grading but giving feedback to the student with
an easy and efficient tool.

# Design principles

- User can create, load and save their own rubrics.
- User can export filled rubric to Google Docs.
- Works in a browser.
- No server needed.

# Development

## TODO

- localize app title
- create example rubrics
- create 10 minute presentation on Rubric 
- add documentation
- aria tags for accessibility

## Developing and building Rubric

Install dependencies:

```
nvm use
yarn install
```

Run development server:

```
cd client
yarn install
yarn start
```

Build production site:

```
yarn build
```

## Technology

Rubric is developed by using many tools:

- The app is coded in the [TypeScript](https://www.typescriptlang.org/) programming language.

- Packages are managed with [Yarn](https://yarnpkg.com/), which runs on [Node.js](https://nodejs.org/).

- The UI is built with the [React](https://reactjs.org/) library and uses 
  [Material-UI](https://material-ui.com/) components, 
  [Material Design icons](https://google.github.io/material-design-icons/) and the
  [Roboto Font](https://github.com/googlefonts/roboto).

- The UI is provided in English and Finnish with [react-i18next](https://react.i18next.com/)
  internationaliation framework.

- The app is tested automatically with [Jest](https://jestjs.io/) and [Enzyme](https://github.com/enzymejs/enzyme), 
  which use [ts-jest](https://github.com/kulshekhar/ts-jest), 
  [enzyme-adapter-react-16](https://enzymejs.github.io/enzyme/) and
  [enzyme-to-json](https://github.com/adriantoine/enzyme-to-json) to test React components with tests coded in 
  TypeScript and compare the results against [JSON](https://www.json.org/) snapshots. 

- Code is analysed and formatted with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).   

- The app is bundled with [webpack](https://webpack.js.org/) 
  and the bundle size is analyzed with 
  [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).
  
- Webpack loads TypeScript code with [ts-loader](https://github.com/TypeStrong/ts-loader) and resolves and injects CSS 
  files with [css-loader](https://webpack.js.org/loaders/css-loader/) and 
  [style-loader](https://webpack.js.org/loaders/style-loader/).

- The built app is hosted by a small [Express](https://expressjs.com/) server.

- App development with live reloading is done with 
  [webpack-dev-server](https://webpack.js.org/configuration/dev-server/).

- App state is manipulated with the help of the [optics-ts](https://github.com/akheron/optics-ts) optics library.

- Files uploaded by user are validated with the [ajv](https://github.com/ajv-validator/ajv) JSON Schema validator. 

- HTML input given by user is sanitized with [DOMPurify](https://github.com/cure53/DOMPurify).