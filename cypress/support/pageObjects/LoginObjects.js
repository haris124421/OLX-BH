class LoginObjects {

    loginPopup() {
        return cy.get("._34a7409b._3bdb8f07")
    }

    loginWithEmail() {
        return cy.get('._5fd7b300.c6ce5164._31a14546._42207ab4:nth-child(3)')
    }

    enterEmail() {
        return cy.get("#email")
    }

    nextBtn() {
        return cy.get(".a755fcd9 > button")
    }

    enterPassword() {
        return cy.get("#password")
    }

    clickLogin() {
        return cy.get(".a755fcd9 > button > span")
    }
}

export default LoginObjects