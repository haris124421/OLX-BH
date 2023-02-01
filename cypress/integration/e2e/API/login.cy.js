describe('Login', () => {
    
  before(() => {
      //custom command to generate session key request and save the token from response
      cy.GenerateSessionKey();
      //using local storage command to save data
      cy.saveLocalStorage();
    });
  
    beforeEach(() => {
      cy.restoreLocalStorage();
  });

  it('should login', () => {
  
  cy.getAllLocalStorage().then(token => {

    Object.keys(token).forEach(key => {
      if (key.match(/^http:\/\/localhost/)) {
        const localhostToken = token[key]
        cy.request({
            method: 'POST',
            url: Cypress.env('BaseURL')+'/api/keycloak/session',
            body: {
              "accessToken": localhostToken.accessToken,
              "idToken": localhostToken.idToken,
              "refreshToken": localhostToken.refreshToken
            }
          }).then( (response) =>{
            expect(`Response.status = ${response.status}`).to.eq('Response.status = 200')
          })
        }
      })
    })
  })
})