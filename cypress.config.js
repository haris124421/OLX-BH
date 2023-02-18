const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 55000,
  defaultCommandTimeout:20000,
  env: {
    url: 'https://stage.olx-bh.run/en',
    detailPage: 'https://stage.olx-bh.run/en/ad/vehicles-carsvehicles-cars-ID2198.html',
    BaseURL: 'https://stage.olx-bh.run',
    // stopLoop: 'false'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: [
      // './cypress/integration/e2e/*.js',
      './cypress/integration/e2e/**/*.js'
    ],
    excludeSpecPattern: './cypress/integration/e2e/FrontEnd/BusinessPackages.cy.js'
  },
  "retries": {
    // Configure retry attempts for `cypress run`
    // Default is 0
    "runMode": 2,
    // Configure retry attempts for `cypress open`
    // Default is 0
    "openMode": 0
  }
});

require('@applitools/eyes-cypress')(module);
