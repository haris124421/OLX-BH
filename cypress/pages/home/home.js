import pageObjectsHome from "../../fixtures/page_objects/home.json"

class home{

    olxLogo() {
        return cy.get(pageObjectsHome.olxLogo)
    }

    loginButton() {
        return cy.get(pageObjectsHome.login_button)
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
        return cy.get('._1075545d > ._34a7409b')
    }
    listingClick(){
        return cy.get('._459428ad').eq(0)
    }
}

export default home;