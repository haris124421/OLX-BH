class locations {

    locationInput(){
        return cy.get('.fc60720d:nth-child(2)')
    }

    locationValues() {
        return cy.get('._1075545d._2c7c227e._96d4439a')
    }

    LocationOnAdCard() {
        return cy.get('.b384f4f3 > ul > li > article > div:nth-child(2) > div:nth-child(3)')
    }
}

export default locations;