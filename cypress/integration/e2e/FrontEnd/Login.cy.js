import LoginObjects from "../../../pages/login/login"
import HomePage from "../../../support/pageObjects/HomePage"
import CategoryPage from "../../../support/pageObjects/CategoryPage"
import DetailPage from "../../../support/pageObjects/DetailPage"
import ChatsPage from "../../../support/pageObjects/ChatsPage"

const loginObj = new LoginObjects();
const homePageobj = new HomePage();
const categoryPageObj = new CategoryPage();
const detailPageObj = new DetailPage();
const chatsPageObj = new ChatsPage();




describe('Login Functionality Tests', () => {

  let fixtures;
  before('Load Utility data', function() {
    cy.fixture("utilityData.json").then($utilityData => {
      cy.fixture('page_objects/home.json').then($home => {
        cy.fixture('page_objects/login.json').then($login => {
          fixtures = {$utilityData, $home, $login}
            return cy.wrap(fixtures)
        }) 
      })
    })  
  })
    
  beforeEach(() => {
    
    cy.visitDomain(fixtures.$utilityData.authUsername, fixtures.$utilityData.authPassword)
  
  });
  
  let utility

  it.only('should login with Email with valid credentials', () => {
    
    cy.log("Click on login")
    cy.get(fixtures.$home.login_button).click()

    cy.olxLogin(fixtures, fixtures.$utilityData.userEmail, fixtures.$utilityData.userPassword)
    
    cy.log("click on profile dropdown")
    cy.get(fixtures.$login.profileIcon)
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
  
    cy.visitDetailPage(utility.authUsername, utility.authPassword)
    
    detailPageObj.chatButton().click()
    
    cy.olxLogin(utility.userEmail, utility.userPassword)
    
    chatsPageObj.chatBox().should('be.visible')

  });
  
  it('should open login page upon clicking report ad option without login', () => {
  
    homePageobj.listingClick().click()
    detailPageObj.reportThisAd().click()
    cy.wait(3000)
    loginObj.loginPopup()
    .should('be.visible')

  });

})
