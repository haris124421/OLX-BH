const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 25000,
  defaultCommandTimeout:10000,
  env: {
    url: 'https://stage.olx-eg.run/en',
    detailPage: 'https://stage.olx-bh.run/en/ad/german-dog-ID1700.html',
    // stopLoop: 'false'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "./cypress/integration/e2e/*.js"
  },
});