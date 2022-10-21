describe('API Requests', () => {
    
    before(() => {
        cy.GenerateSessionKey();
        cy.saveLocalStorage();
      });
    
      beforeEach(() => {
        cy.restoreLocalStorage();
      });

    it("it should get Wallet Balance", () => {
        cy.getLocalStorage("accessToken").should("exist");
        cy.getLocalStorage("accessToken").then(token => {
            cy.request({
                method : 'GET',
                url: 'https://stage.olx-bh.run/api/user/0926c075-6afb-4d66-ba17-8a01a6a93e70/wallet',
                headers : {"Authorization": "Bearer " + token}
        }).then( (response) =>{
            expect(`Response.status = ${response.status}`).to.eq('Response.status = 200')
            var walletBalance = response.body.balance
            cy.log(walletBalance)
      })
        });
      });

})