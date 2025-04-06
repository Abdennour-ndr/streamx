// Import commands.js using ES2015 syntax:
import './commands'

// Import global styles
import '../../src/app/globals.css'

// Import component testing specific commands
import { mount } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', mount)

// Add any global component test setup here
beforeEach(() => {
  // Reset any side effects between tests
}) 