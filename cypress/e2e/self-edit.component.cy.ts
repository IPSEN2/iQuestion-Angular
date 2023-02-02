describe('user/SelfEditComponent', () => {
  // It should pass when you press change password
  it('Should pass when you press change password', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('caregiver@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');

    // go to self edit page
    cy.visit('/me');
    cy.url().should('include', 'me');
    // Check wether the change password button is there (passwordResetButton) and click it
    cy.get('#passwordResetButton').click();
    // Check wether the toast are 2 toasts in the screen
    cy.get('app-toasts').children().should('have.length', 2);
  });

  // You should not be able to edit your email address
  it('Should not be able to edit your email address', () => {
    // log in
    cy.visit('/');
    cy.url().should('includes', '');
    cy.get('[formControlName="email"]').type('caregiver@test.com');
    cy.get('[formControlName="password"]').type('12345678');
    cy.get('button').click();
    cy.url().should('include', 'questionnaires');

    // go to self edit page
    cy.visit('/me');
    cy.url().should('include', 'me');
    // Check wether the email input is there (emailInput) and check if its parent's parent has property disabled
    cy.get('#userEmailInput').parent().parent().should('have.prop', 'disabled');
  });
});
