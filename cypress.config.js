const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 100000,
  viewportHeight: 800,
  viewportWidth: 1200,
  e2e: {
    baseUrl: 'https://demo.casino/',
  },
});
