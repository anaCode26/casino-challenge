// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

require('@cypress/xpath');

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

Cypress.on('log:changed', (log, interactive) => {
  const logs = window.top.document.querySelectorAll('.command-info:nth-last-child(-n + 10)')
  logs.forEach(log => {
    const logMethod = log.querySelector(".command-method")?.innerText
    if (logMethod?.includes("(fetch)") || logMethod?.includes("(xhr)"))  {
      const logMessage = log.querySelector(".command-message-text");
      logMessage.innerText = logMessage.innerText.slice(0, 20) + '...'
    }
  })
})