describe('API Requests', () => {
    
    before(() => {
        cy.GenerateSessionKey();
        cy.saveLocalStorage();
      });
    
      beforeEach(() => {
        cy.restoreLocalStorage();
      });

      it('should login user', () => {
        cy.loginWithApi()
    })

      it('should PAA', () => {
        cy.getLocalStorage("accessToken").should("exist");
        cy.getLocalStorage("accessToken").then(token => {
        cy.request({
            method : 'POST',
            url: 'https://stage.olx-bh.run/api/listing/upsert',
            headers : {"Authorization": "Bearer " + token},
            body: {
              "extra_fields":{
                  "price":5000,
                  "price_type":"price"
              },
              "area":0,
              "type":"general",
              "user_external_id":"0926c075-6afb-4d66-ba17-8a01a6a93e70",
              "purpose":"for-sale",
              "state":"pending",
              "source":"strat",
              "contact_info":{
                  "name":"Muhammad Haris BH",
                  "mobile":"+923234077603",
                  "roles":[
                    "allow_chat_communication",
                    "show_phone_number"
                  ]
              },
              "title": "My ad title",
              "description":"My ad description for PAA API",
              "photos":[
                  
              ],
              "location_id":"2-51",
              "category_id":"249"
            }
          }).then( (response) =>{
            expect(`Response.status = ${response.status}`).to.eq('Response.status = 201')
          })});
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