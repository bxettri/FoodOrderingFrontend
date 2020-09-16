

describe("Signup" , function()
{
    

    it("Signup " , function(){
        cy.visit('http://localhost:3000/');
        cy.get('a').contains('SignUp').click();
        cy.get('input[name="name"]').type('Bibek Dahal');
        cy.get('input[name="address"]').type('Kathmandu');
        cy.get('input[name="phone"]').type('9813929379');
        cy.get('input[name="email"]').type('bvekxettrii@gmail.com');
        cy.get('input[name="username"]').type('bvekxettrii');
        cy.get('input[name="password"]').type('Pass1234');
        cy.get('button').contains('Sign Up').click();
       
    });

})