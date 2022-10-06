class HomePage{

    olxLogo() {
        return cy.get('.fb1b3abd.bcd9fd70')
    }

    loginbtn() {
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
}

export default HomePage;