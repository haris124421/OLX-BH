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
import HomePage from "../support/pageObjects/HomePage"

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
  
  loginObj.loginWithEmail().click()
  loginObj.enterEmail().type($email)
  loginObj.nextBtn().click()
  loginObj.enterPassword().type($password)
  loginObj.clickLogin().click()
})

Cypress.Commands.add('getSessionKey', () => {

  let accessToken
  let idToken
  let refreshToken
return cy.request({
    method: 'POST',
    url: 'https://auth.stage.olx-bh.run/auth/realms/olx-bh/protocol/openid-connect/token', // baseUrl is prepend to URL
    form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    body: {
        grant_type: 'password',
        client_id: 'frontend',
        scope: 'openid',
        type: 'email_password',
        email: 'muhammad.haris@empglabs.com',
        password: '1234567a',
    },
  })
  .then( (response) =>{
      expect(`Response.status = ${response.status}`).to.eq('Response.status = 200')
      accessToken= response.body.access_token
      idToken= response.body.refresh_token
      refreshToken = response.body.id_token
      cy.writeFile('cypress/fixtures/testdata.json', {
        "accessToken": response.body.access_token,
        "idToken": response.body.id_token,
        "refreshToken" : response.body.refresh_token
    })

})
})

Cypress.Commands.add('apiLogin', ($accessToken, $idToken, $refreshToken) =>{
  cy.request({
    method: 'POST',
    url: 'https://stage.olx-bh.run/api/keycloak/session',
    body: {
      "accessToken": $accessToken,
      "idToken": $idToken,
      "refreshToken": $refreshToken
    }
  })
})

