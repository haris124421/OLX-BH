const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 25000,
  defaultCommandTimeout:10000,
  env: {
    url: 'https://stage.olx-bh.run/en',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "./cypress/integration/e2e/*.js"
  },
});