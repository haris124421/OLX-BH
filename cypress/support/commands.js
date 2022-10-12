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

import LoginObjects from "../support/pageObjects/LoginObjects"
import HomePage from "../support/pageObjects/HomePageObjects"

Cypress.Commands.add("visitDomain", (username, password) => {
    cy.visit(Cypress.env('url'), {
        auth: {
          username: username,
          password: password
        }
      })
})

Cypress.Commands.add('olxLogin', ($email, $password) => {

  const loginObj = new LoginObjects();
  const homePageObj = new HomePage();

  homePageObj.loginButton().click()
  loginObj.loginWithEmail().click()
  loginObj.enterEmail().type($email)
  loginObj.nextBtn().click()
  loginObj.enterPassword().type($password)
  loginObj.clickLogin().click()
})