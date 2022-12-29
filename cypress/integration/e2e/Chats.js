/// <reference types="cypress"/>

import 'cypress-if'

describe('Testing chats on detail page', function() {

    let utility
    before("Loading utility data from fixtures", function() {
      cy.fixture("utilityData").then((utilityData) => {
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

    it('testing chats', function() {

      cy.loginWithApi()
      //   cy.reload().wait(5000).get('._459428ad').each(($el) => {
      //     cy.wait(3000)
      //     cy.wrap($el).click()
      //     cy.reload()
      //       cy.wait(2000)
      //       cy.then(() => {
      //         if(Cypress.$("._1075545d.c2a2a887._1709dcb4").find("button[class$='_5fd7b300 f3d05709']").is(':visible')){
      //           cy.wait(2000)
      //           cy.get("._1075545d.c2a2a887._1709dcb4 > span > button").trigger('click')
      //           return false
      //         } else {
      //           cy.go('back')
      //         }
      //       })
      // })
      

      let ads = 20
      for(let i=0; i<=ads; i++){
        let temp
        cy.get('._459428ad').eq(i).click().wait(2000)
        cy.reload()
        cy.wait(5000)
        cy.then(() => {
        cy.log(Cypress.$('._1075545d.c2a2a887._1709dcb4 > span > button').length === 1)
          const checkChatButton = Cypress.$('._1075545d.c2a2a887._1709dcb4 > span > button').length === 1
          if(checkChatButton === true) {
            cy.reload()
            cy.get("._1075545d.c2a2a887._1709dcb4 > span > button").trigger('click')
            cy.then(() => {
              this.temp = 20
              // cy.log(temp)
            })
          } else {
            cy.go('back')
          }
        })
        cy.log(this.temp)
        // if(i == vision) {
        //   // break
        //   return false
        // }
      }
    })
})