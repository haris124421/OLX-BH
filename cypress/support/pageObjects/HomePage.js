class HomePage{

    olxLogo() {
        return cy.get('.fb1b3abd.bcd9fd70')
    }

    loginButton() {
        return cy.get("._0db6bd2f._1b04dcc1")
    }

    UserIsLoggedIn(){
        return cy.get('._0559c5ad')
    }

    FavoriteIcon(){
        return cy.get('._3c2d02e2')
    }
    MarkedAsFavorite(){
        return cy.get('[alt="favoriteIconSelected"]')
    }

    profileWindowArrow() {
        return cy.get(".f5e6c6e9 > ._1075545d")
    }

    topbar() {
        return cy.get("._1075545d._17fba712._96d4439a")
    }

    logut() {
        return cy.get("div[aria-label$='Logout']")
    }
    languageButton(){
        return cy.get('._39a8843c.cf485b3b')
    }
    profileIcon(){
        return cy.get('._0559c5ad._624c3ae3')
    }
    sellButton(){
        return cy.get('._0db6bd2f.b7016787')
    }
    listingClick(){
        return cy.get('._459428ad').eq(0)
    }
    locationInput() {
        return cy.get(".fc60720d:nth-child(2)")
    }

    locationValues() {
        return cy.get('._7ebd8a86 > span')
    }

    LocationOnAdCard() {
        return cy.get('._42a32bfd.bcc9fe4f > li > article .d737f398 > ._5ea5614c > .afabcb7f > span:nth-child(1)')
    }
}

export default HomePage;