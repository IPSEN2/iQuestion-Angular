describe('UserComponent', () => {
  it('Should create user when valid data is provided', () => {
    cy.intercept("POST", 'http://localhost:8080/auth/login',{fixture: 'loginSuccess.json'})
    cy.intercept("POST", 'http://localhost:8080/auth/register/',{fixture: 'loginSuccess.json'})

    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('s1133277@student.hsleiden.nl');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();

    cy.url().should('include', 'questionnaires');

    cy.get('[routerLink="/user"]').click();
    cy.get('[routerLink="/userCreate"]').click();

    cy.get('[formControlName="registerEmail"]').type('cypress@student.hsleiden.nl');
    cy.get('[formControlName="registerName"]').type('Cypress');
    cy.get('[formControlName="registerOrganization"]').type('Cypress');
    cy.get('[formControlName="registerRole"]').select('SPINE_USER');

    cy.get('[type="submit"]').click();
  });
})
