/// <reference types="cypress"/>

import LocationObjects from "../../support/pageObjects/LocationObjects"
import 'cypress-wait-until';

const locationObj = new LocationObjects()

describe("Locations on the home page and it's functionalities", () => {
 
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
    }
    else{
      cy.visit('https://olx.com.bh/en')
    } 
  })

    /** TO-DO
    /* Verify country specific locations and its redirection ✅
    /* Verify the current location and its data
    /* Click on location bar and enter a locaiton manually
    /* Verify if see all option in (country name) is working fine */

      it("Verify if default country is selected as a location", () => {
        locationObj.locationInput()
          .should('have.value', utility.country)

      })


      it.skip("Verify country specific locations and its redirection", () => {
        const regions = utility.locationRegions
        const regionsValue = String(regions[Math.floor(Math.random() * regions.length)])

        locationObj.locationInput().clear() // Clear Country "Bahrain" name from location

        locationObj.locationInput().type(regionsValue)
          .should('have.value', regionsValue).wait(2000) // type random region name
          
        locationObj.locationValues() // getting values from the dropdown and matching values with types one
          .each(($el) => {
            const location = cy.wrap($el.text())
            if(cy.wrap($el.text()).should('include', regionsValue)) 
            cy.wait(3000)
              cy.wrap($el).should('have.length', 1).click()
            
            return false
          })    

          locationObj.LocationOnAdCard().each(($el) => { // confirming ad location on search page.
            cy.wrap($el)
              .contains(regionsValue).should(() => {
                expect($el).to.contain(regionsValue)
              })
            })
      })
})