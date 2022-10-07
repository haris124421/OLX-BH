/// <reference types="cypress"/>

import LoginObjects from "../../support/pageObjects/LoginObjects"
import HomePage from "../../support/pageObjects/HomePage"
import CategoryPage from "../../support/pageObjects/CategoryPage"

const loginObj = new LoginObjects();
const homePageobj = new HomePage();
const categoryPageObj = new CategoryPage();

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
    
    homePageObj.loginButton().click()

    cy.olxLogin(utility.userEmail, utility.userPassword)
    
    homePageobj.profileIcon()
    .should('be.visible')
  
  })
  
  it('hould not login with Email with Invalid password', () => {
    
    homePageObj.loginButton().click()

    cy.olxLogin(utility.userEmail, utility.invalidPassword)
    
    loginObj.invalidLoginError()
    .should('have.text','Invalid credentials.')
  
  });

  it.only('should redirect user to categories page upon login after sell cick', () => {
    
    homePageobj.sellButton()
    .click()

    cy.olxLogin(utility.userEmail, utility.userPassword)
     categoryPageObj.chooseCategorySection()
     .should('have.text', 'Choose a category')

  });

})
