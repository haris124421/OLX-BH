import LoginObjects from "../../support/pageObjects/LoginPage"
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

    it('should open login page upon clicking fav icon without login', () => {
        
        homePageObj.FavoriteIcon()
        .should('be.visible')
        .then(($favIcons) => {
            
            return Cypress._.sampleSize($favIcons.toArray(), 1)
        
        }).should(
            
            'have.length', 1
        )
        .click().wait(4000)
        
        loginPageObj.loginPopup()
        .should('be.visible')

    })

    it('should mark as favorite', () => {
        
        cy.loginWithApi()
        
        homePageObj.FavoriteIcon()
        .should('be.visible').then(($favIcons) => {
            
            return Cypress._.sampleSize($favIcons.toArray(), 1)
        
        })
        .should( 
            'have.length', 1
            ).click()
        homePageObj.MarkedAsFavorite()
        .invoke('attr', 'class')
        .should('eq', '_1075545d _3c2d02e2 _840fd97c')
        
        
   
    });

    it.only('should unmark all favorites', ()=>{
        cy.loginWithApi()
        homePageObj.profileWindowArrow().click()
        homePageObj.myAds().click()
        cy.get('[href="/en/myfavorites"] > span').click()
        cy.get('body').then($body => {
            cy.wait(10000)
            //const favads = $body.find("div._1075545d._3c2d02e2._840fd97c")
            //cy.log(favads)
            if ($body.find("div._1075545d._3c2d02e2._840fd97c").length > 0) {
                cy.wrap($body.find("div._1075545d._3c2d02e2._840fd97c")).click({ multiple: true })
                cy.log('All favorite ads have been unmarked.')
            } else {
              cy.log('No favorite ads available.')
            }
          })
    })

});