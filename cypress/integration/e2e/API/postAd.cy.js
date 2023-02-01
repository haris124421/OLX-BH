import postAd_data from "../../../fixtures/api_data/postAd.json"

describe('Post ad', () => {
    
    before(() => {
        //custom command to generate session key request and save the token from response
        cy.GenerateSessionKey();
        //using local storage command to save data
        cy.saveLocalStorage();
      });
    
      beforeEach(() => {
        cy.restoreLocalStorage();
    });

    it('should PAA', () => {

    //get token from local storage
    cy.getLocalStorage("accessToken").should("exist");
    //passing token in api request
    cy.getLocalStorage("accessToken").then(token => {
        cy.request({
            method : 'POST',
            url: Cypress.env('BaseURL')+'/api/listing/upsert',
            headers : {"Authorization": "Bearer " + token},
            body: postAd_data
        }).then( (response) =>{
            expect(`Response.status = ${response.status}`).to.eq('Response.status = 201')
        })
    })
})
})