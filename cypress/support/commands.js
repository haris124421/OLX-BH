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

import LoginObjects from "./pageObjects/LoginPage"
import HomePage from "./pageObjects/HomePage"
import PostAdPage from "./pageObjects/PostAdPage";
import "cypress-localstorage-commands"

Cypress.Commands.add("visitDomain", (username, password) => {
    cy.visit(Cypress.env('url'), {
        auth: {
          username: username,
          password: password
        }
      })
})
Cypress.Commands.add("visitDetailPage", (username, password) => {
  cy.visit(Cypress.env('detailPage'), {
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

Cypress.Commands.add('loginWithApi', () => {

  let accessToken
  let idToken
  let refreshToken
cy.request({
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
      //identity=response.body
      accessToken= response.body.access_token
      //bearerToken = response.body.access_token
      idToken= response.body.id_token
      refreshToken = response.body.refresh_token
      //cy.setLocalStorage("accessToken", identity.access_Token);
cy.apiLogin(accessToken,idToken, refreshToken)
cy.reload()
})

})

Cypress.Commands.add('apiLogin', (accessToken, idToken, refreshToken) =>{
  cy.request({
    method: 'POST',
    url: 'https://stage.olx-bh.run/api/keycloak/session',
    body: {
      "accessToken": accessToken,
      "idToken": idToken,
      "refreshToken": refreshToken
    }
  })
})

Cypress.Commands.add('checkWalletBalanceApi',()=>{
  cy.loginWithApi().its('body')
  .then(identity => {
    cy.setLocalStorage("accessToken", identity.access_token);
  });
})

Cypress.Commands.add('GenerateSessionKey', () => {
cy.request({
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
  .its('body')
  .then(identity => {
    cy.setLocalStorage("accessToken", identity.access_token);
    cy.setLocalStorage("idToken", identity.id_token);
    cy.setLocalStorage("refreshToken", identity.refresh_token)
    cy.saveLocalStorage();
    // cy.getLocalStorage("accessToken").should("exist");
    //     cy.getLocalStorage("accessToken").then(token => {
    //       console.log("Identity token", token);
    //     });      
})
})

function randomString(pattern) {
  for(var i = 0; i < 20; i++){
    randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
  }
  return randomText      
}