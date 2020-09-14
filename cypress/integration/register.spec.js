describe("Register" , function()
{
    it("register " , function(){
        cy.visit('http://localhost:3000/');
        cy.get('a').contains('Register').click();
        cy.get('input[placeholder="name"]').type('shanti');
        cy.get('input[placeholder="address"]').type('koteshwor');
        cy.get('input[placeholder="phone"]').type('9813929389');
        cy.get('input[placeholder="email"]').type('shanti@shat.com');
        cy.get('input[placeholder="username"]').type('shant11');
        cy.get('input[placeholder="password"]').type('shant@11');
        cy.get('button').contains('Sign Up').click();
        });
})
