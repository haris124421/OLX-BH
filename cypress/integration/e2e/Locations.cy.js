/// <reference types="cypress"/>

import HomePage from "../../support/pageObjects/HomePage"
import locations from "../../support/pageObjects/locations";
//import 'cypress-wait-until';

const homePageobj = new HomePage();
const locationObj = new locations();

describe("Locations on the home page and it's functionalities", () => {
 
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

    /** TO-DO
    /* Verify country specific locations and its redirection ✅
    /* Verify the current location and its data ⏳
    /* Click on location bar and enter a locaiton manually ✅
    /* Verify if see all option in (country name) is working fine ⏳
    */ 

      it("Verify if default country is selected as a location", () => {
        locationObj.locationInput()
          .wait(5000)
          .should('have.value', utility.country)

      })

      let regionsValue
      it("Click on location bar and enter a locaiton manually", () => {
        const regions = utility.locationRegions
        regionsValue = String(regions[Math.floor(Math.random() * regions.length)]) // picking random region from utility

        locationObj.locationInput()
          .clear() // Clear Country "Bahrain" name from location

          locationObj.locationInput()
          .type(regionsValue)
          .should('have.value', regionsValue)
          .wait(10000) // typing that regionsValue(RandomLocation) in location search bar
      })

      it("Verify country specific locations and its redirection", () => {
        // const regions = utility.locationRegions
        // const regionsValue = String(regions[Math.floor(Math.random() * regions.length)])

        locationObj.locationInput()
          .clear() // Clear Country "Bahrain" name from location

          locationObj.locationInput()
          .type(regionsValue)
          .should('have.value', regionsValue)
          .wait(5000) // type random region name
          
          locationObj.locationValues() // getting values from the dropdown and matching values with types one
          .each(($el) => {
            const location = cy.wrap($el.text())
            if(cy.wrap($el.text()).should('include', regionsValue))
            cy.wait(3000)
              cy.wrap($el)
              .should('have.length', 1)
              .click()
            
            return false
          })

          
          locationObj.LocationOnAdCard()
          .each(($el) => { // confirming ad location on search page.
            cy.wrap($el)
              .contains(regionsValue)
              .should(() => {
                expect($el).to.contain(regionsValue)
              })
            })
      })
})