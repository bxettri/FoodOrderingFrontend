describe("Add restaurant" , function()
{
    it("resturant add " , function(){
        cy.visit('http://localhost:3000/');
        cy.get('button').contains('SignIn').click();
        cy.get('input[placeholder="Username"]').type('admin');
        cy.get('input[placeholder="Password"]').type('1234');
        cy.get('button').contains('Submit').click();
        cy.get('#restauran').click();
        cy.get('input[placeholder="restaurant"]').type('munglan restro');
        cy.get('input[placeholder="address"]').type('sindhuli');
        cy.get('button').contains('Add Resturant').click();
        });
})
