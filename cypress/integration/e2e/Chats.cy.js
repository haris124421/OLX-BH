import ChatsPage from "../../support/pageObjects/ChatsPage";
import DetailPage from "../../support/pageObjects/DetailPage";

const detailPageObj =  new DetailPage();
const chatPageObj = new ChatsPage();

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

    it('Click Chat on Detail Page - should open chat', () => {
      cy.visitDetailPage(utility.authUsername, utility.authPassword)
      cy.loginWithApi()
      detailPageObj.chatButton().click()
      chatPageObj.chatBox().should('be.visible')
      cy.wait(5000)
      chatPageObj.chatTextArea().type('Hi')
      chatPageObj.sendChatBtn().click()
      cy.wait(3000)
      });
});