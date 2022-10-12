/// <reference types="cypress"/>

import LoginObjects from "../../support/pageObjects/LoginObjects"
import HomePage from "../../support/pageObjects/HomePageObjects"

const loginObj = new LoginObjects();
const homePageobj = new HomePage();

describe('Login Functionality Tests', () => {
    
  beforeEach(() => {
    
    cy.visitDomain(utility.authUsername, utility.authPassword)
  
  });
  
  let utility
    
  before('Load Utility data', function() {
      
    cy.fixture("utilityData.json").then((utilityData) => {
        
      utility = utilityData
      
      return cy.wrap(utility)
      
    })
    
  })

  it('should login with Email with valid credentials', () => {
    
    cy.olxLogin(utility.userEmail, utility.userPassword)
    
    homePageobj.profileIcon()
    .should('be.visible')
  
  })
  
  it('hould not login with Email with Invalid password', () => {
    
    cy.olxLogin(utility.userEmail, utility.invalidPassword)
    
    loginObj.invalidLoginError()
    .should('have.text','Invalid credentials.')
  
  });

})
