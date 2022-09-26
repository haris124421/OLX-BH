import { cyan } from "colorette";
import { eq } from "lodash";

export class LoginPage {

    navigate(){
        cy.visit('https://olx.com.bh/en')
    }

    login(userName, password,type,i){
        //cy.contains("Login").click();
        cy.get('._5fd7b300.c6ce5164._31a14546._42207ab4').eq(i).click();
        cy.get(type).type(userName);
        cy.contains("Next").click();
        cy.get('#password').type(password);
        cy.contains("Log in").click();
    }

    

    invalidPasswordLogin(){
        cy.contains('Invalid credentials').should('be.visible');
    }

    loginbox(){
        cy.get('._470ef52d._9bb11e5f').should('be.visible');
    }
}