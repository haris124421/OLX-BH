/// <reference types="cypress"/>

import LoginObjects from "../../support/pageObjects/LoginObjects"
import HomePage from "../../support/pageObjects/HomePage"

const loginObj = new LoginObjects();
const homePageobj = new HomePage();

describe('Login Functionality Tests', () => {
    
  let utility
    before('Load Utility data', function() {
      cy.fixture("utilityData.json").then((utilityData) => {
        utility = utilityData
      return cy.wrap(utility)
      })
    })

    afterEach("logout if login", () => {
      cy.wait(5000)
      homePageobj.topbar().then(($top) => {
        if($top.find("._874da736").is(':visible')) {
          homePageobj.profileWindowArrow().click()
          homePageobj.logut().click()
        }
      })
      
    })

  it("Verify domain link is working fine", () => {
    cy.visitDomain(utility.authUsername, utility.authPassword)
  })

  it('Verify login with email', () => {
    cy.olxLogin(utility.userEmail, utility.userPassword)
  })
  
  it('Verify login with incorrect crederntials', () => {
    cy.olxLogin(utility.userEmail, utility.invalidPassword)
  });
})
