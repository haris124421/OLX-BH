import { cyan } from "colorette";
import { eq } from "lodash";

export class HomePage{
    
    clickOnLoginButton(){
        cy.contains("Login").click();
    }

    verifyIfUserIsLoggedIn(){
        cy.get('._0559c5ad').should('be.visible');
    }

}