/// <reference types="cypress"/>

import LoginObjects from "../../support/pageObjects/LoginObjects"
import HomePage from "../../support/pageObjects/HomePageObjects"
import CategoryPage from "../../support/pageObjects/CategoryPage"
import DetailPage from "../../support/pageObjects/DetailPage"
import ChatsPage from "../../support/pageObjects/ChatsPage"

const loginObj = new LoginObjects();
const homePageobj = new HomePage();
const categoryPageObj = new CategoryPage();
const detailPageObj = new DetailPage();
const chatsPageObj = new ChatsPage();

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
    
    homePageobj.loginButton().click()

    cy.olxLogin(utility.userEmail, utility.userPassword)
    
    homePageobj.profileIcon()
    .should('be.visible')
  
  })
  
  it('should not login with Email with Invalid password', () => {
    
    homePageobj.loginButton().click()

    cy.olxLogin(utility.userEmail, utility.invalidPassword)
    
    loginObj.invalidLoginError()
    .should('have.text','Invalid credentials.')
  
  });

  it('should redirect user to categories page upon login after sell cick', () => {
    
    homePageobj.sellButton()
    .click()

    cy.olxLogin(utility.userEmail, utility.userPassword)
     
    categoryPageObj.chooseCategorySection()
    .should('have.text', 'Choose a category')

  });

  it('should redirect user to chat window upon login after chat click', () => {
  
    homePageobj.listingClick().click()
    
    detailPageObj.chatButton().click()
    
    cy.olxLogin(utility.userEmail, utility.userPassword)
    
    chatsPageObj.chatInbox().should('be.visible')

  });
  
  it('should open login page upon clicking report ad option without login', () => {
  
    homePageobj.listingClick().click()
    
    detailPageObj.reportThisAd().click()
    
    loginObj.loginPopup()
    .should('be.visible')

  });



})
