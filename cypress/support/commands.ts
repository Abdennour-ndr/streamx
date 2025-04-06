// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  namespace Cypress {
    interface Chainable {
      apiRequest(method: string, url: string, body?: any): Chainable<Response<any>>
      setAuthToken(token: string): void
    }
  }
}

// Cypress.Commands.overwrite() can be used to override existing commands
Cypress.Commands.overwrite('visit', (originalFn: Cypress.VisitFunction, url: string, options?: Partial<Cypress.VisitOptions>) => {
  // Add any pre-visit logic here
  return originalFn(url, {
    ...options,
    // Add any default options here
    timeout: 60000,
  })
})

// Example of a reusable custom command for API calls
Cypress.Commands.add('apiRequest', (method: string, url: string, body?: any) => {
  return cy.request({
    method,
    url: `${Cypress.env('API_URL')}${url}`,
    body,
    headers: {
      'Content-Type': 'application/json',
      // Add any other headers needed
    },
  })
})

// Example of a command to handle authentication token
Cypress.Commands.add('setAuthToken', (token: string) => {
  window.localStorage.setItem('auth_token', token)
})

export {} // This export is needed to make this a module 