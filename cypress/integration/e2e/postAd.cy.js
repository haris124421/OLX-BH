describe('Verify Ad Posting', () => {
    let utility
    before("Loading utility data from fixtures", function() {
      cy.fixture("utilityData")
        .then((utilityData) => {
        utility = utilityData
        return cy.wrap(utility)
      })
    })

    beforeEach('it should visit the url', function() {
        if (Cypress.env('url') == 'https://stage.olx-bh.run/en')
        {
          cy.visitDomain(utility.authUsername, utility.authPassword)
          cy.reload()
        }
        else{
          cy.visit('https://olx.com.bh/en')
        } 
      })
    it('it should post ad successfully', () => {
        let title= ""
        let description = ""
        let randomText = ""
        var pattern = "ABCDFSHQTAADFHYT234434kashfro234233yfakzmxbcvpqurfksfh2346728163844"
        for(var i = 0; i < 20; i++)
        randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
        title = randomText + "title"
        description = randomText + "description"
        cy.loginWithApi()
        cy.get('._0db6bd2f.b7016787').click()
        cy.contains('Services').click()
        cy.contains('Other Services').click()
        cy.get('#title').type(title)
        cy.get('#description').type(description)
        cy.get('#price').type('1234')
        cy.get('#Location').click()
        cy.contains('Capital Governorate, Bahrain').click()
        cy.get('#City').click()
        cy.contains('Adliya').click()
        cy.get('._5fd7b300.f3d05709').click()
    });
});