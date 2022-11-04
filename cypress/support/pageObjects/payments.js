class payments { 

    paymentsPage() {
        return cy.get("._7978e49c.e17db4b0._2e82a662.a695f1e9")
    }

    paretnCategory() {
        return cy.get("#parentCategory")
    }

    subCategory() {
        return cy.get('#subcategory')
    }

    submitBtn() {
        return cy.get("button[type='submit']")
    }

    bundlePackages() {
        return cy.get('._7978e49c._2e82a662')
    }
}

export default payments;