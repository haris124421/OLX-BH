import { cyan } from "colorette";
import { eq } from "lodash";

export class HomePage{
    
    clickOnLoginButton(){
        cy.contains("Login").click();
    }

    verifyIfUserIsLoggedIn(){
        cy.get('._0559c5ad').should('be.visible');
    }

    clickOnFavoriteIcon(){
        cy.get('._3c2d02e2').eq(0).click();

    }
    verifyIfMarkedAsFavorite(){
        cy.get('[alt="favoriteIconSelected"]').should('be.visible');
    }

}