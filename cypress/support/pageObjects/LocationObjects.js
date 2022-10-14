class locationObjects {

    locationInput() {
        return cy.get(".fc60720d:nth-child(2)")
    }

    locationValues() {
        return cy.get('._7ebd8a86 > span')
    }

    LocationOnAdCard() {
        return cy.get('._42a32bfd.bcc9fe4f > li > article .d737f398 > ._5ea5614c > .afabcb7f > span:nth-child(1)')
    }
}

export default locationObjects;
