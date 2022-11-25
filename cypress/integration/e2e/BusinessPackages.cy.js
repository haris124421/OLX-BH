/// <reference types = "Cypress"/>

import { should } from "chai";
import HomePage from "../../support/pageObjects/HomePage"
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
    // let price
    it("Go to Buy Business package window and buy a package", ()=> {

        cy.loginWithApi().wait(3000)

        homePageObj.profileWindowArrow()
        .should("be.visible")
        .click({force:true}).wait(2000)

        paymentObj.buyBusinessPackages()
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



        paymentObj.packages()
        .should('be.visible').then(($el) => {
          let selected = Cypress._.sampleSize($el.toArray(), 1)

          cy.get(selected).should('have.length', 1)

          cy.get(selected).find("[type='checkbox']")
          .check().should('be.checked')

          cy.get(selected).find("[aria-label='Discount price']")
          .invoke('text')
          .as('val')

          cy.get('@val').then(($txt) => {
            const packagePrice = $txt.split(" ")
            let priceWithSpace = packagePrice[1]
            let price = parseFloat(priceWithSpace.trim())
            cy.log(price)
  
            paymentObj.viewCartPrice()
            .should('be.visible')
            .invoke('text')
            .as('viewCart')
  
            cy.get('@viewCart').then(($txtCart) => {
              const viewCartText = $txtCart.split(' ')
              let viewCartTrimPirce = viewCartText[2]
              let viewCartPrice = parseFloat(viewCartTrimPirce.trim())
              cy.log(viewCartPrice)
              expect(price).to.eq(viewCartPrice)

              paymentObj.viewCartButton()
              .should('be.visible')
              .click()
      
              paymentObj.CartPage()
              .should('be.visible')
              
              paymentObj.packagePriceOnCartPage()
              .should('be.visible')
              .invoke('text').as('cartPackagePrice')
              cy.get('@cartPackagePrice').then(($packageTxtCart) => {
                const cartPackageText = $packageTxtCart.split(' ')
                let cartPackageTrimPrice = cartPackageText[1]
                let cartPackagePrice = parseFloat(cartPackageTrimPrice.trim())
                cy.log(cartPackagePrice * 2)

                paymentObj.packageTotalPriceOnCartPage()
                .should('be.visible')
                .invoke('text')
                .as('totalCart')

                cy.get('@totalCart').then(($totalPriceTxt) => {
                  const totalPackagePrice = $totalPriceTxt.split(' ')
                  let totalPackagePriceTrim = totalPackagePrice[1]
                  let cartPackageTotalPrice = parseFloat(totalPackagePriceTrim.trim())
                  

                  paymentObj.increaseQuantitybtn()
                  .should('be.visible')
                  .then(() => {
                    expect(cartPackagePrice).to.eq(cartPackageTotalPrice)
                  })
                  .click().wait(2000)
                  .then(() => {
                    paymentObj.packageTotalPriceOnCartPage().invoke('text').should('include', cartPackagePrice*2)
                  }).then(() => {
                    paymentObj.decreaseQuantitybtn().should('be.visible').click().then(() => {
                      paymentObj.packageTotalPriceOnCartPage().invoke('text').should('include', cartPackagePrice)
                    })
                  })  
                })
              })
            })
          })
        })

        paymentObj.payButton()
        .should('be.visible')
        .click()

        paymentObj.walletPayment()
        .should('be.visible')
        .click()

        paymentObj.yesPayButton()
        .should('be.visible')
        .click()

        paymentObj.sucessScreen()
        .should('be.visible')
        .invoke('text')
        .should('include', "Congratulations")

        paymentObj.myAdsButton()
        .should('be.visible')

        paymentObj.billingInfoButton()
        .should('be.visible')
    })


})