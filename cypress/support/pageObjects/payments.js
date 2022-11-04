class payments { 

    buyBusinessPackages() {
        return cy.get("[href$='/en/payments/businesspackages/my-account'] > div")
    }

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

    packages() {
        return cy.get('._1075545d._1cfa8ae9.d059c029')
    }
    packagesCheckpoint() {
        return cy.get("[type='checkbox']")
    }

    viewCartPrice() {
        return cy.get("._1075545d._6d154e38 > ._34a7409b")
    }
    
    viewCartButton() {
        return cy.get("[type='submit']")
    }

    CartPage() {
        return cy.get('._259f4064._2e82a662')
    }

    packagePriceOnCartPage() {
        return cy.get('._1075545d.a10938b9._5f872d11 > div > span')
    }

    packageTotalPriceOnCartPage() {
        return cy.get(".f0a1f280 > :nth-child(2) > ._34a7409b")
    }

    increaseQuantitybtn() {
        return cy.get(':nth-child(3) > img')
    }

    decreaseQuantitybtn() {
        return cy.get('._1075545d.a4050ed2:first-child')
    }

    payButton() {
        return cy.get("[type='submit']")
    }

    walletPayment() {
        return cy.get('._1075545d._57ec5ee8._96d4439a')
    }

    yesPayButton() {
        return cy.get("[type='submit']:last-child")
    }

    sucessScreen() {
        return cy.get('._7978e49c')
    }

    myAdsButton() {
        return cy.get('[href="/en/myads"] > ._5fd7b300')
    }

    billingInfoButton() {
        return cy.get('[href="/en/myorders/billing"] > ._5fd7b300')
    }
}

export default payments;