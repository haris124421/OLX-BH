import { waitForDebugger } from "inspector";
import {HomePage} from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage";

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

    it('should mark as favorite then unmark', () => {
        homePageObj.clickOnLoginButton();
        loginPageObj.login("muhammad.haris@empglabs.com","1234567a","#email",2);
        homePageObj.clickOnFavoriteIcon();
        homePageObj.verifyIfMarkedAsFavorite();
        homePageObj.clickOnFavoriteIcon();
        homePageObj.verifyIfUnMarkedAsFavorite();
    });

    
});