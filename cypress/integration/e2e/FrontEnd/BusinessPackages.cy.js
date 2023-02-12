/// <reference types = "Cypress"/>


/** Go to Buy Business package window and buy a package ✅
Make sure that you can pay with olx wallet (OLX wallet) ✅
Make sure your balance appears successfully in your wallet with the correct amount (OLX wallet)
Verify that user can buy feature package
Verify that the frontend does not crash if a category has no package. Check with page refresh as well
Verify if user is able to feature ad that is posted in L3 category
Verify if Customized Packages section appears on the searched packages screen.
*/


describe("Buy Business Packages from wallet and other payment methods", () => {

  let fixtures;
  before('Load Utility data', function() {
      cy.fixture("utilityData.json").then($utilityData => {
          cy.fixture('page_objects/BusinessPackages.json').then($BusinessPackages => {
              cy.fixture('page_objects/home.json').then($home => {
                fixtures = {$utilityData, $BusinessPackages, $home}
                return cy.wrap(fixtures)
              })
          })
      })  
  })


  let subCarCategory
  let subCategory
  let randomParentCategory
  let randomSubCategory
  before("Parsing the Fixtures to selectcategory ad subcategory", () => {

    const parentCategory = Object.values(fixtures.$utilityData.parentCategory)

    subCarCategory = fixtures.$utilityData.subCategory.Cars
    subCategory = Object.values(fixtures.$utilityData.subCategory.property)

    randomParentCategory = String(parentCategory[Math.floor(Math.random() * parentCategory.length)])
    randomSubCategory = String(subCategory[Math.floor(Math.random() * subCategory.length)])
  })
  
  
  beforeEach('it should visit the url', function() {
    if (Cypress.env('url') == 'https://stage.olx-bh.run/en')
    {
      cy.visitDomain(fixtures.$utilityData.authUsername, fixtures.$utilityData.authPassword)
      cy.reload()
    }
    else{
      cy.visit('https://olx.com.bh/en')
    } 
  })

  it('Verify buy business package with no credits in wallet', () => {
    cy.loginWithApi().wait(3000)

    cy.get(fixtures.$home.profileWindowArrow)
    .should("be.visible")
    .click({force:true}).wait(2000)

    cy.get(fixtures.$BusinessPackages.buyBusinessPackages)
    .contains('Buy business packages')
    .click()

    cy.get(fixtures.$BusinessPackages.paymentsPage)
    .should("be.visible")

    cy.get(fixtures.$BusinessPackages.submitBtn)
    .should('be.disabled').wait(2000)

    cy.get(fixtures.$BusinessPackages.parentCategory)
    .select(randomParentCategory)
    .should('have.value', randomParentCategory)

    cy.get(fixtures.$BusinessPackages.subCategory).then(($el) => {
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
  
      cy.get(fixtures.$BusinessPackages.submitBtn)
      .should('be.enabled')
      .click()
    })

    cy.get(fixtures.$BusinessPackages.bundlePackages)
    .should("be.visible")
    .should("have.text", "Heavy discount on Packages")

    cy.get(fixtures.$BusinessPackages.packages)
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
  
      cy.get(fixtures.$BusinessPackages.viewCartPrice)
      .should('be.visible')
      .invoke('text')
      .as('viewCart')
  
      cy.get('@viewCart').then(($txtCart) => {
        const viewCartText = $txtCart.split(' ')
        let viewCartTrimPirce = viewCartText[2]
        let viewCartPrice = parseFloat(viewCartTrimPirce.trim())
        cy.log(viewCartPrice)
        expect(price).to.eq(viewCartPrice)

      cy.get(fixtures.$BusinessPackages.viewCartButton)
      .should('be.visible')
      .click()
      
      cy.get(fixtures.$BusinessPackages.CartPage)
      .should('be.visible')
              
      cy.get(fixtures.$BusinessPackages.packagePriceOnCartPage)
      .should('be.visible')
      .invoke('text').as('cartPackagePrice')
        
      cy.get('@cartPackagePrice').then(($packageTxtCart) => {
        const cartPackageText = $packageTxtCart.split(' ')
        let cartPackageTrimPrice = cartPackageText[1]
        let cartPackagePrice = parseFloat(cartPackageTrimPrice.trim())
        cy.log(cartPackagePrice * 2)

        cy.get(fixtures.$BusinessPackages.packageTotalPriceOnCartPage)
        .should('be.visible')
        .invoke('text')
        .as('totalCart')

        cy.get('@totalCart').then(($totalPriceTxt) => {
          const totalPackagePrice = $totalPriceTxt.split(' ')
          let totalPackagePriceTrim = totalPackagePrice[1]
          let cartPackageTotalPrice = parseFloat(totalPackagePriceTrim.trim())      

          cy.get(fixtures.$BusinessPackages.increaseQuantitybtn)
          .should('be.visible')
          .then(() => {
            expect(cartPackagePrice).to.eq(cartPackageTotalPrice)
          })
          .click().wait(2000).then(() => {
            cy.get(fixtures.$BusinessPackages.packageTotalPriceOnCartPage).invoke('text')
            .should('include', cartPackagePrice*2)
            }).then(() => {
              cy.get(fixtures.$BusinessPackages.decreaseQuantitybtn)
              .should('be.visible').click().then(() => {
                cy.get(fixtures.$BusinessPackages.packageTotalPriceOnCartPage).invoke('text')
                .should('include', cartPackagePrice)
                })
              })  
            })
          })
        })
      })
    })

    cy.get(fixtures.$BusinessPackages.payButton)
    .should('be.visible')
    .click().wait(2000)

    cy.get(fixtures.$BusinessPackages.walletPayment)
    .should('be.visible')
    .click()

    cy.intercept(
      {
          method: "POST",
          url: "https://stage.olx-bh.run/api/user/a56c3a96-ad27-4b7c-8aed-b4e2645ac499/wallet"
      }).as('noCredit')

      cy.wait('@noCredit').then(res => {
        res.response.statusCode = 400,
        res.response.body = "you can't remove value greater than user balance";
      })

    cy.get(fixtures.$BusinessPackages.yesPayButton)
    .should('be.visible')
    .click()
  })
})