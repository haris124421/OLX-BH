import HomePage from "../../support/pageObjects/HomePage"
import PostAdPage from "../../support/pageObjects/PostAdPage";

const homePageObj = new HomePage();
const postAdPageObj = new PostAdPage();

describe('Verify Ad Posting', () => {
    let utility
    before("Loading utility data from fixtures", function() {
      cy.fixture("utilityData")
        .then((utilityData) => {
        utility = utilityData
        return cy.wrap(utility)
      })
    })

    beforeEach('it should visit the url', function() {
        if (Cypress.env('url') == 'https://stage.olx-bh.run/en')
        {
          cy.visitDomain(utility.authUsername, utility.authPassword)
          cy.reload()
        }
        else{
          cy.visit('https://olx.com.bh/en')
        } 
      })
    it('it should post ad successfully', () => {
        
        cy.loginWithApi()
        // homePageObj.sellButton().click()
        // cy.fillPostAdForm()
        // postAdPageObj.successPage().should('be.visible')
    });
});