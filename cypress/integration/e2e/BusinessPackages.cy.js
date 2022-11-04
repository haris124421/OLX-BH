/// <reference types = "Cypress"/>

import HomePage from "../../support/pageObjects/HomePageObjects"
import payments from "../../support/pageObjects/payments"

const homePageObj = new HomePage();
const paymentObj = new payments();


/** Go to Buy Business package window and buy a package ⏳
Make sure that you can pay with olx wallet (OLX wallet)
Make sure your balance appears successfully in your wallet with the correct amount (OLX wallet)
Verify that user can buy feature package
Verify that the frontend does not crash if a category has no package. Check with page refresh as well
Verify if user is able to feature ad that is posted in L3 category
Verify if Customized Packages section appears on the searched packages screen.
*/


describe("Buy Business Packages from wallet and other payment methods", () => {
    let utility
    before("Loading utility data from fixtures", function() {
      cy.fixture("utilityData")
        .then((utilityData) => {
        utility = utilityData
        return cy.wrap(utility)
      })
    })


    let subCarCategory
    let subCategory
    let randomParentCategory
    let randomSubCategory
    before("Parsing the Fixtures to selectcategory ad subcategory", () => {

      const parentCategory = Object.values(utility.parentCategory)

      subCarCategory = utility.subCategory.Cars
      subCategory = Object.values(utility.subCategory.property)

      randomParentCategory = String(parentCategory[Math.floor(Math.random() * parentCategory.length)])
      randomSubCategory = String(subCategory[Math.floor(Math.random() * subCategory.length)])
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

    // let ParentCategory
    it("Go to Buy Business package window and buy a package", ()=> {

        cy.loginWithApi().wait(3000)

        homePageObj.profileWindowArrow()
        .should("be.visible")
        .click({force:true}).wait(2000)

        homePageObj.buyBusinessPackages()
        .contains('Buy business packages')
        .click()

        paymentObj.paymentsPage()
        .should("be.visible")

        paymentObj.submitBtn().should('be.disabled')

        paymentObj.paretnCategory()
        // cy.get("#parentCategory")
        .select(randomParentCategory)
        .should('have.value', randomParentCategory)

        paymentObj.subCategory()
        .then( ($el) => {
          if(randomParentCategory == '129')
          {
            cy.wrap($el)
            .select(subCarCategory)
            .should('have.value', subCarCategory)
          } 
          else {
            cy.wrap($el)
            .select(randomSubCategory)
            .should('have.value', randomSubCategory).wait(2000)
          }

          paymentObj.submitBtn()
          .should('be.enabled')
          .click()
        })

        paymentObj.bundlePackages()
        .should("be.visible")
        .should("have.text", "Heavy discount on Packages")
    })
})