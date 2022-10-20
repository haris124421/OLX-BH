/// <reference types="cypress"/>
describe("Login with API", function(){

  it("should generate session key and login with kecloack request", function(){
        
        cy.visitDomain('sl','getin1')
        cy.loginWithApi()
        })
})  