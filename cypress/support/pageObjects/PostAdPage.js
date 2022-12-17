class PostAdPage{

    chooseCategory(){
       return cy.contains('Services')
    }

    chooseSubcategory(){
        return cy.contains('Other Services')
    }
     adTitle(){
        return cy.get('#title')
     }

     adDescription(){
        return cy.get('#description')
     }
     adPrice(){
        return cy.get('#price')
     }
     adLocation(){
        return cy.get('#Location')
     }
     selectLocationL1(){
        return cy.contains('Capital Governorate, Bahrain')
     }
     postBtn(){
        return cy.get('._5fd7b300.f3d05709')
     }

}
export default PostAdPage;