
import HomePage from "../../support/pageObjects/HomePage"
import DetailPage from "../../support/pageObjects/DetailPage";

const homePageObj = new HomePage();
const detailPajeObj =  new DetailPage();
var adTiles =5
describe('Chats Cases', () => {

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

    it('should send chats', () => {
      
      //cy.wait(3000)
      cy.visitDetailPage(utility.authUsername, utility.authPassword)
      cy.loginWithApi()
      cy.get('._5fd7b300.f3d05709').click()
      cy.get('._1075545d.d42c0c59._773e5144').should('be.visible')
      
      });
});