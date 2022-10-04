/// <reference types="cypress"/>

import LoginObjects from "../../support/pageObjects/LoginObjects"
import HomePage from "../../support/pageObjects/HomePage"

describe('Verifing arabic language of olx-lb', ()=> {
    
    let utility
    before('Load Utility data', function() {
      cy.fixture("utilityData.json").then((utilityData) => {
        utility = utilityData
      return cy.wrap(utility)
      })
    })

    it('it should visit the url', ()=> {
        cy.visitDomain(utility.authUsername, utility.authPassword)
    })
<<<<<<< HEAD
    it('shoud switch to arabic', () => {
      cy.get('._39a8843c.cf485b3b').click()
      
    });
=======
>>>>>>> 77a8e28fe33faf355b4944fe7ae365f464336afc
})