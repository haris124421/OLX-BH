import ChatsPage from "../../support/pageObjects/ChatsPage";
import DetailPage from "../../support/pageObjects/DetailPage";
import 'cypress-wait-until';

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

      cy.fixture('utilityData').then((utilityData) => {
        utilityData.chatButtonFound = false;
        return cy.writeFile('cypress/fixtures/utilityData.json', utilityData)
      });
    })

    beforeEach('it should visit the url', function() {
      cy.visitDomain(utility.authUsername, utility.authPassword) 
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

    it.skip('try chats', () => {
      let adsCount;
      var adsList = [];
      let flag = false;
      let adLocator = "._459428ad";
      let chatLocator = "._5fd7b300.f3d05709";
      
      cy.get('._459428ad')
      .then(($ads) => {
          adsCount = $ads.length
          cy.wrap($ads).each(($el, index) => {
              adsList.push(index)
          })
          .then(($lst) => {
              cy.wrap($lst).should('have.length', 20)
          })
          .then(() => {
              adsList.forEach(function(item) {
              // cy.log(JSON.stringify(item))
              })
          })
      })

        cy.get(adLocator).each(($el, index) => {
            cy.get(adLocator).eq(index).click().wait(10000).then(() => {
              if(Cypress.$(chatLocator).length == 1) {
                cy.wait(2000)
                flag === true
                // return false
                // break;
              } else {
                cy.go('back')
              }
            }) 
        });
    })
});