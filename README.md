[![Build Status](https://travis-ci.org/lfernandoavalos/giphy-searcher.svg?branch=master)](https://travis-ci.org/lfernandoavalos/giphy-searcher)


# Giphy Seacher

ReactJS powered GIF Searcher using the [Giphy API](https://github.com/Giphy/GiphyAPI)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have a GIPHY API_KEY, you can request one here [Developers Giphy](https://developers.giphy.com/) just follow instructions to create app and generate api__key

What things you need to install and run the magic

- [npm](https://docs.npmjs.com/) >= v5.4.2
- [node](https://nodejs.org/en/docs/) >= v8.4.0

### Installing

Execute the following commands to install all requirements

```
npm install
```


## Running the tests

If you need to make sure nothing broke, just execute the following command

```
npm run test
```

## Deployment

Depending on where you want to deploy the application. If you want to run the production build you can use the following command

```
GIPHY_API_KEY=[YOUR PRODUCTION KEY] npm run build
```

Once the build is generated you may you our favorit hosting platform, [Heroku](https://www.heroku.com/), [Surge](https://surge.sh/) to deploy the build files.

## Built With

* [ReactJs](https://reactjs.org/) - V in MVC
* [Redux](https://redux.js.org/) - State Management
* [React Router](https://github.com/ReactTraining/react-router) - Client side routing (SPA)
* [Webpack](https://webpack.js.org/) - Used for bundling
* [Postcss Modules](https://github.com/css-modules/postcss-modules) - Used for scoped styling on components
* [Axios](https://github.com/axios/axios) - Http requests
* [NPM](https://www.npmjs.com/) - Package manager for Javascript

## Contributing

Run the following command to run in development mode locally

***NOTE: GIPHY API KEY is required or project will not be able to perform correctly authenticated requests to the Giphy api***

```
npm install # Make sure you have project dependencies installed
GIPHY_API_KEY=[YOUR PRODUCTION KEY] npm run start-dev
```

This will start your webpack-dev-server which will do hot-reload whenever any changes are made to your files. This repo follows [airbnb-eslint](https://www.npmjs.com/package/eslint-config-airbnb) style guide and will trigger a pre-commit hook which will lint project and alert for any coding style guide errors.

If you need to fix linting errors run the following command

```
npm run lint:js
```


## Authors

* **Fernando Avalos** - *Initial work* - [lfernandoavalos](https://github.com/lfernandoavalos)


## Acknowledgments

* [Dan Abramov](https://github.com/gaearon) - Redux
* [HOU Bin](https://github.com/kouhin) - Async Redux data loader
* [Giphy](https://giphy.com/) - API
