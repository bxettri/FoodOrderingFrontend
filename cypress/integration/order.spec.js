describe("Order" , function()
{
    it("order food from cart " , function(){
        cy.visit('http://localhost:3000/');
        cy.get('button').contains('SignIn').click();
        cy.get('input[placeholder="Username"]').type('bvek11');
        cy.get('input[placeholder="Password"]').type('1234');
        cy.get('button').contains('Submit').click();
        cy.get('#bag').click();
        cy.get('button').contains('Order').click();
        cy.get('button').contains('Yes').click();
   
        });
})
