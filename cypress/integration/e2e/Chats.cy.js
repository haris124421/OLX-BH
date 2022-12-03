
import HomePage from "../../support/pageObjects/HomePage"
import DetailPage from "../../support/pageObjects/DetailPage";

const homePageObj = new HomePage();
const detailPajeObj =  new DetailPage();
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

    it('Click on Chat should open Chat', () => {
      cy.loginWithApi()
      const adTiles =10
      for (let i = 0; i < adTiles; i++) {
        cy.wait(3000)
        cy.get('._459428ad').eq(0).click();
        cy.wait(3000)
        cy.get("body").then($body => {
        if($body.find("button[class$='_5fd7b300 f3d05709']").is(':visible')){
          cy.wait(3000)
          cy.get('._5fd7b300.f3d05709').click()
          cy.wait(5000)
          i = 10
          cy.get('._1075545d.d42c0c59._773e5144').should('be.visible')
        }
        else{
          cy.go('back')
        }
      })
        
        }
      });
});