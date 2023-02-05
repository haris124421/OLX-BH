import LoginObjects from "../../support/pageObjects/LoginPage"
import HomePage from "../../support/pageObjects/HomePage"

const homePageObj = new HomePage();
const loginPageObj = new LoginObjects();

describe('Favorites Cases', () => {

    
    // let utility;
    // let favorites;
    // let login;
    // let home;
    // before('Load Utility data', function() {
    //     cy.fixture("utilityData.json").then(($utilityData) => {
    //         utility = $utilityData
    //         return cy.wrap(utility)
    //     })
    //     cy.fixture("page_objects/Favorites.json").then(($favorites) => {
    //         favorites = $favorites
    //         return cy.wrap(favorites)
    //     })
    //     cy.fixture("page_objects/login.json").then(($login) => {
    //         login = $login
    //         return cy.wrap(login)
    //     })
    //     cy.fixture("page_objects/home.json").then(($home) => {
    //         home = $home
    //         return cy.wrap(home)
    //     })  
    // })
    let fixtures;
    beforeEach(() => {
        cy.fixture('utilityData.json')
        .then($utilityData => {
            cy.fixture('page_objects/Favorites.json')
            .then($favorites => {
                cy.fixture('page_objects/login.json')
                .then($login => {
                    cy.fixture('page_objects/home.json')
                    .then($home => {
                        fixtures = {$utilityData, $favorites, $login, $home}
                        return cy.wrap(fixtures)
                    })
                })
            });
        });
    });
    
    beforeEach('Visit Domain', () => {
        cy.visitDomain(fixtures.$utilityData.authUsername, fixtures.$utilityData.authPassword)
    })

    it('should open login page upon clicking fav icon without login', () => {
        
        // homePageObj.FavoriteIcon()
        cy.get(fixtures.$favorites.FavoriteIcon)
        .should('be.visible')
        .then(($favIcons) => {  
            return Cypress._.sampleSize($favIcons.toArray(), 1)
        }).should('have.length', 1)
        .click().wait(10000)
        
        // loginPageObj.loginPopup()
        cy.get(fixtures.$login.login_popup)
        .should('be.visible')

    })

    it('should mark as favorite', () => {
        
        cy.loginWithApi()
        // homePageObj.FavoriteIcon()
        cy.get(fixtures.$favorites.FavoriteIcon)
        .should('be.visible')
        .then(($favIcons) => {
            return Cypress._.sampleSize($favIcons.toArray(), 1)
        }).should('have.length', 1)
        .then(($fav) => {
            if($fav.is(':indeterminate'))
            {
                cy.wrap($fav).uncheck()
            }
        }).click()
        // homePageObj.MarkedAsFavorite()
        var withDots = fixtures.$favorites.MarkedAsFavorite;
        var dotsRemoved = withDots.replace(/\./g, ' ');
        cy.log(dotsRemoved);

        var newMarkasFav = dotsRemoved.slice(1);
        cy.log(newMarkasFav);

        cy.get(fixtures.$favorites.MarkedAsFavorite)
        .invoke('attr', 'class')
        .should('eq', newMarkasFav)
    });

    it('should unmark all favorites', ()=>{
        cy.loginWithApi()
        cy.reload();
        // homePageObj.profileWindowArrow()
        cy.get(fixtures.$home.profileWindowArrow).click()
        // homePageObj.myAds()
        cy.get(fixtures.$home.myAds).click()
        cy.get(fixtures.$home.favorites).click()
        cy.wait(6000)
        cy.get('body').then($body => {
            cy.wait(10000)
            //const favads = $body.find("div._1075545d._3c2d02e2._840fd97c")
            //cy.log(favads)
            if ($body.find(fixtures.$home.favoritesAds).length > 0) {
                cy.wrap($body.find(fixtures.$home.favoritesAds)).each(($el, index) => {
                    cy.get($el).click().wait(3000)
                })
                // cy.reload()
                cy.log('All favorite ads have been unmarked.')
                cy.wait(5000)
                cy.get(fixtures.$favorites.NoFavAds)
                .should('have.text','No favorites yet.')
            } else {
              cy.log('Already No favorite ads available.')
              cy.get(fixtures.$favorites.NoFavAds)
              .should('have.text','No favorites yet.')
            }
        })
    })
});