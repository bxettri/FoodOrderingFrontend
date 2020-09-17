describe("Add food to cart" , function()
{
    it("food should be added to cart" , function(){
        cy.visit('http://localhost:3000/');
        cy.get('button').contains('SignIn').click();
        cy.get('input[placeholder="Username"]').type('Sharukh11');
        cy.get('input[placeholder="Password"]').type('1234');
        cy.get('button').contains('Submit').click();
        cy.get('a').contains('Bajeko Sekuwa').click();
        cy.get('a').contains('Muttton Sekuwa').click();
        cy.get('input[placeholder="notes"]').type('with curry');
        cy.get('input[placeholder="quantity"]').type('2');
        cy.get('a').contains('Add to cart').click();
    });
})
