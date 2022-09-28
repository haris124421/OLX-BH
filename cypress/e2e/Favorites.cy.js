import {HomePage} from "../pages/HomePage"
import { LoginPage } from "../pages/loginPage";

const homePageObj = new HomePage();
const loginPageObj = new LoginPage();

describe('Favorites Cases', () => {
    
    beforeEach('navigate to login page',() => {
        loginPageObj.navigate();
      });
    
    it('shoudl open login page', () => {
        homePageObj.clickOnFavoriteIcon();
        loginPageObj.loginPopup();
    });

    it('should mark as favorite', () => {
        homePageObj.clickOnLoginButton();
        loginPageObj.login("muhammad.haris@empglabs.com","1234567a","#email",2);
        homePageObj.clickOnFavoriteIcon();
        homePageObj.verifyIfMarkedAsFavorite();
    });

    
});