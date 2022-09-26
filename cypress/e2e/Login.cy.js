import {LoginPage} from "../pages/LoginPage"
const loginObj = new LoginPage();

describe('Login', () => {
  beforeEach('navigate to login page',() => {
    loginObj.navigate();
  });
  it('should login with email', () => {
    loginObj.login("muhammad.haris@empglabs.com","1234567a","#email",2);
    loginObj.validateLogin();
  })
  
  it('should not login with incorrect crederntials', () => {
    loginObj.login("muhammad.haris@empglabs.com","1234567b","#email",2);
    loginObj.invalidPasswordLogin();
  });

})