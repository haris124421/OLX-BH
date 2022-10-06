/// <reference types="cypress"/>

import LoginObjects from "../../support/pageObjects/LoginObjects"
import HomePage from "../../support/pageObjects/HomePage"

const loginObj = new LoginObjects();
const homePageobj = new HomePage();

describe('Verifing arabic language of olx-lb', ()=> {
    
    let utility
    before('Load Utility data', function() {
      cy.fixture("utilityData.json").then((utilityData) => {
        utility = utilityData
      return cy.wrap(utility)
      })
    })

    beforeEach('it should visit the url', ()=> {
        cy.visitDomain(utility.authUsername, utility.authPassword)
    })
    it('shoud switch to arabic', () => {
      homePageobj.languageButton().click()
      homePageobj.languageButton().invoke('attr', 'aria-label').should('include','English')
      
    });
})