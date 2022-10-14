/// <reference types="cypress"/>
describe("Login with API", function(){
  
  let utility
    
  afterEach('Load updated payload data', function() {
      
    cy.fixture("testData.json").then((utilityData) => {
        
      utility = utilityData
      
      return cy.wrap(utility)
      
    })
    
  })
  it("should Get Session Key", function(){
        
        cy.visitDomain('sl','getin1')
        cy.getSessionKey()
        })

// it('should login user with token', () => {
//   cy.apiLogin(utility.accessToken, utility.idToken, utility.refreshToken)
//   cy.reload()
// })
})  