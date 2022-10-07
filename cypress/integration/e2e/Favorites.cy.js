import LoginObjects from "../../support/pageObjects/LoginObjects"
import HomePage from "../../support/pageObjects/HomePage"

const homePageObj = new HomePage();
const loginPageObj = new LoginObjects();

describe('Favorites Cases', () => {

    
    let utility
    
    before('Load Utility data', function() {
      
        cy.fixture("utilityData.json").then((utilityData) => {
            utility = utilityData
            return cy.wrap(utility)
        
        })
    })

    beforeEach('Visit Domain', () => {
        
        cy.visitDomain(utility.authUsername, utility.authPassword)
    
    })

    it('shoudl open login page', () => {
        
        homePageObj.FavoriteIcon()
        .should('be.visible')
        .then(($favIcons) => {
            
            return Cypress._.sampleSize($favIcons.toArray(), 1)
        
        }).should(
            
            'have.length', 1
        )
        .click();
        
        loginPageObj.loginPopup()
        .should('be.visible')

    });

    it('should mark as favorite', () => {
        
        homePageObj.loginButton().click()
        
        cy.olxLogin(utility.userEmail, utility.userPassword)
        
        homePageObj.FavoriteIcon()
        .should('be.visible').then(($favIcons) => {
            
            return Cypress._.sampleSize($favIcons.toArray(), 1)
        
        })
        .should(
            
            'have.length', 1
        
            )
        .click()
        
        homePageObj.MarkedAsFavorite()
        .invoke('attr', 'alt')
        .should('eq', 'favoriteIconSelected')
   
    });

});