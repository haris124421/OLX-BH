import {LoginPage} from "../pages/LoginPage"
import { HomePage } from "../pages/HomePage";

const loginPageObj = new LoginPage();
const homePageobj = new HomePage();

describe('Login', () => {
  beforeEach('navigate to login page',() => {
    loginPageObj.navigate();
  });
  it('should login with email', () => {
    homePageobj.clickOnLoginButton();
    loginPageObj.login("muhammad.haris@empglabs.com","1234567a","#email",2);
    homePageobj.verifyIfUserIsLoggedIn();
  })
  
  it('should not login with incorrect crederntials', () => {
    homePageobj.clickOnLoginButton();
    loginPageObj.login("muhammad.haris@empglabs.com","1234567b","#email",2);
    loginPageObj.invalidPasswordLogin();
  });

})