describe('ChangePasswordComponent', () => {
  // It should pre-fill the id for us
  it('Should pre-fill the id for us', () => {
    // Go to the change password page with a token
    cy.visit('/change-password/123456789');
    // Check if we are on the right page
    cy.url().should('includes', 'change-password');
    // Check if the token is pre-filled
    cy.get('[formControlName="resetToken"]').should('have.value', '123456789');
  });

  // It should give an error when the token is invalid
  it('Should give an error when the token is invalid', () => {
    // Go to the change password page with a token
    cy.visit('/change-password/123456789');
    // Check if we are on the right page
    cy.url().should('includes', 'change-password');
    // Check if the token is pre-filled
    cy.get('[formControlName="resetToken"]').should('have.value', '123456789');
    // Set the password
    cy.get('[formControlName="newPassword"]').type('12345678');
    // Get button with id submitBtn and click it
    cy.get('#submitBtn').click();
    // Check if a toast is shown saying: "Deze token is niet gevonden."
    cy.get('app-toasts').should('contain', 'De token is niet gevonden');
  });
});
