import LoginObjects from "../../support/pageObjects/LoginPage"
import HomePage from "../../support/pageObjects/HomePage"

const homePageObj = new HomePage();
const loginPageObj = new LoginObjects();

describe('Favorites Cases', () => {

    
    let utility;
    let favorites;
    let login;
    let home;
    before('Load Utility data', function() {
        cy.fixture("utilityData.json").then((utilityData) => {
            utility = utilityData
            return cy.wrap(utility)
        })
        cy.fixture("page_objects/Favorites.json").then(($favorites) => {
            favorites = $favorites
            return cy.wrap(favorites)
        })
        cy.fixture("page_objects/login.json").then(($login) => {
            login = $login
            return cy.wrap(login)
        })
        cy.fixture("page_objects/home.json").then(($home) => {
            home = $home
            return cy.wrap(home)
        })
        
    })

    beforeEach('Visit Domain', () => {
        cy.visitDomain(utility.authUsername, utility.authPassword)
    })

    it('should open login page upon clicking fav icon without login', () => {
        
        // homePageObj.FavoriteIcon()
        cy.get(favorites.FavoriteIcon)
        .should('be.visible')
        .then(($favIcons) => {  
            return Cypress._.sampleSize($favIcons.toArray(), 1)
        }).should('have.length', 1)
        .click().wait(10000)
        
        // loginPageObj.loginPopup()
        cy.get(login.login_popup)
        .should('be.visible')

    })

    it('should mark as favorite', () => {
        
        cy.loginWithApi()
        // homePageObj.FavoriteIcon()
        cy.get(favorites.FavoriteIcon)
        .should('be.visible')
        .then(($favIcons) => {
            return Cypress._.sampleSize($favIcons.toArray(), 1)
        })
        .should('have.length', 1).click()
        // homePageObj.MarkedAsFavorite()
        cy.get(favorites.MarkedAsFavorite)
        .invoke('attr', 'class')
        .should('eq', favorites.MarkedAsFavorite)
    });

    it('should unmark all favorites', ()=>{
        cy.loginWithApi()
        cy.reload();
        // homePageObj.profileWindowArrow()
        cy.get(home.profileWindowArrow).click()
        // homePageObj.myAds()
        cy.get(home.myAds).click()
        cy.get(home.favorites).click()
        cy.wait(6000)
        cy.get('body').then($body => {
            cy.wait(10000)
            //const favads = $body.find("div._1075545d._3c2d02e2._840fd97c")
            //cy.log(favads)
            if ($body.find(home.favoritesAds).length > 0) {
                cy.wrap($body.find(home.favoritesAds)).click({ multiple: true })
                cy.log('All favorite ads have been unmarked.')
                .should("eq", "All favorite ads have been unmarked.")
            } else {
              cy.log('No favorite ads available.')
              .should('eq', "No favorite ads available.")
            }
          })
    })

});