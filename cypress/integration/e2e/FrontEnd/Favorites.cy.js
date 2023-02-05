
describe('Favorites Cases', () => {

    let fixtures;
    before('Load Utility data', function() {
        cy.fixture("utilityData.json").then($utilityData => {
            cy.fixture('page_objects/Favorites.json').then($favotires => {
                cy.fixture('page_objects/home.json').then($home => {
                    cy.fixture('page_objects/login.json').then($login => {
                        fixtures = {$utilityData, $favotires, $home, $login}
                        return cy.wrap(fixtures)
                    })
                })
            })
        })  
    })

    beforeEach('Visit Domain', () => {
        cy.visitDomain(fixtures.$utilityData.authUsername, fixtures.$utilityData.authPassword)
    })

    it('should open login page upon clicking fav icon without login', () => {
        
        cy.get(fixtures.$favotires.FavoriteIcon)
        .should('be.visible')
        .then(($favIcons) => {  
            return Cypress._.sampleSize($favIcons.toArray(), 1)
        }).should('have.length', 1)
        .click().wait(10000)
        
        cy.get(fixtures.$login.login_popup)
        .should('be.visible')

    })

    it('should mark as favorite', () => {
        
        cy.loginWithApi()
        cy.get(fixtures.$favotires.FavoriteIcon)
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

        var markFavLocator = fixtures.$favotires.MarkedAsFavorite;
        var replacedDotsBySpace = markFavLocator.replace(/\./g, ' ');
        var removedFirstSpace = replacedDotsBySpace.slice(1);

        cy.get(fixtures.$favotires.MarkedAsFavorite)
        .invoke('attr', 'class')
        .should('eq', removedFirstSpace)
    });

    it.only('should unmark all favorites', ()=>{
        cy.loginWithApi()
        cy.reload();
        cy.get(fixtures.$home.profileWindowArrow).click()

        cy.get(fixtures.$home.myAds).click()
        cy.get(fixtures.$home.favorites).click()
        cy.wait(6000)
        cy.get('body').then($body => {
            cy.wait(5000)
            if ($body.find(fixtures.$home.favoritesAds).length > 0) {
                cy.wrap($body.find(fixtures.$home.favoritesAds)).each(($el, index) => {
                    cy.get($el)
                    .click().wait(3000)
                })
                
                cy.log('All favorite ads have been unmarked.')
                cy.get(fixtures.$favotires.NoFavAds)
                .should('have.text','No favorites yet.')
            } else {
              cy.log('No favorite ads available.')
              cy.get(fixtures.$favotires.NoFavAds)
              .should('have.text','No favorites yet.')
            }
        })
    })
});