import pageObjectsLogin from "../../fixtures/page_objects/login.json"

class login {

    loginPopup() {
        return cy.get(pageObjectsLogin.login_popup)
    }

    loginWithEmail() {
        return cy.get(pageObjectsLogin.email_login)
    }

    enterEmail() {
        return cy.get(pageObjectsLogin.email_field)
    }

    nextBtn() {
        return cy.get(pageObjectsLogin.next_button)
    }

    enterPassword() {
        return cy.get(pageObjectsLogin.password_field)
    }

    clickLogin() {
        return cy.get(pageObjectsLogin.login_button)
    }

    invalidLoginError(){
        return cy.get(pageObjectsLogin.error_invalid_login)

    }
}

export default login