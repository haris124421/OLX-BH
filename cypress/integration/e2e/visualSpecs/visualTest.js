/// <reference types="cypress" />

describe('ACME Bank', () => {

    let fixtures;
    before('Load Utility data', function() {
    cy.fixture("utilityData.json").then($utilityData => {
        fixtures = $utilityData
        return cy.wrap(fixtures) 
        })
    })
    // This method performs setup before each test.
    beforeEach(() => {

        // Open Eyes to start visual testing.
        // Each test should open its own Eyes for its own snapshots.
        cy.eyesOpen({
            
            // The name of the application under test.
            // All tests for the same app should share the same app name.
            // Set this name wisely: Applitools features rely on a shared app name across tests.
            appName: 'OLX-Bahrain (BH)',
            
            // The name of the test case for the given application.
            // Additional unique characteristics of the test may also be specified as part of the test name,
            // such as localization information ("Home Page - EN") or different user permissions ("Login by admin"). 
            testName: Cypress.currentTest.title,
        })
    })

    // This test covers login for the Applitools demo site, which is a dummy banking app.
    // The interactions use typical Cypress calls,
    // but the verifications use one-line snapshot calls with Applitools Eyes.
    // If the page ever changes, then Applitools will detect the changes and highlight them in the Eyes Test Manager.
    // Traditional assertions that scrape the page for text values are not needed here.
    it('should open olx bahrain stage home page', () => {

        // Load the login page.
        cy.visitDomain(fixtures.authUsername, fixtures.authPassword)
        cy.wait(5000)
        cy.get('.f4cbb336').should('be.visible')

        // Verify the full login page loaded correctly.
        cy.eyesCheckWindow({
            tag: "Home Page",
            target: 'window',
            fully: true
        });
    })

    // This method performs cleanup after each test.
    afterEach(() => {
        
        // Close Eyes to tell the server it should display the results.
        cy.eyesClose()
    })
})