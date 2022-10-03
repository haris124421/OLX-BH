import {HomePage} from "../pages/HomePage"
import {LoginPage} from "../pages/LoginPage"

const homePageObj = new HomePage();
const loginPageObj = new LoginPage();

describe('Arabic Language Cases', () => {
    
    beforeEach(() => {
        loginPageObj.navigate();
    });
    
    it('should switch the URL to arabic', () => {
        homePageObj.clickOnArabicSwitch();
        cy.url().should('eq', 'https://stage.olx-bh.run/');

    });
});