import wallet_data from "../../../fixtures/api_data/wallet.json"
describe('OLX Wallet', () => {
    
    before(() => {
        //custom command to generate session key request and save the token from response
        cy.GenerateSessionKey()
        //using local storage command to save data
        cy.saveLocalStorage()
      });
    
      beforeEach(() => {

        cy.restoreLocalStorage()
      
    });

    it("it should get Wallet Balance", () => {
        cy.getLocalStorage("accessToken").should("exist");
        cy.getLocalStorage("accessToken").then(token => {
            cy.request({
                method : 'GET',
                url: Cypress.env('BaseURL')+'/api/user/'+wallet_data.userid+'/wallet',
                headers : {"Authorization": "Bearer " + token}
        }).then( (response) =>{
            expect(`Response.status = ${response.status}`).to.eq('Response.status = 200')
            var walletBalance = response.body.balance
            cy.log(walletBalance)
        })
    })
})
})