import HomePage from "../../support/pageObjects/HomePage"
import PostAdPage from "../../support/pageObjects/PostAdPage";

const homePageObj = new HomePage();
const postAdPageObj = new PostAdPage();

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
        homePageObj.sellButton().click()
        postAdPageObj.chooseCategory().click()
        postAdPageObj.chooseSubcategory().click()
        postAdPageObj.adTitle().type(title)
        postAdPageObj.adDescription().type(description)
        postAdPageObj.adPrice().type('5000')
        postAdPageObj.adLocation().click()
        postAdPageObj.selectLocationL1().click()
        cy.get('#City').click()
        cy.contains('Adliya').click()
        postAdPageObj.postBtn().click()
    });
});