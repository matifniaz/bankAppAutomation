// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import addContext from 'mochawesome/addContext';
Cypress.Commands.add("addContext", (context) => {
  Cypress.once("test:after:run", (test, runnable) => addContext({ test }, context));
});

// Cypress.Commands.add("addContextWithSnapShot", () => {
//   Cypress.once("test:after:run", (test, runnable) => addContext({ test }, cy.screenshot()));
// });

